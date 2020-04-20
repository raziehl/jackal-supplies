import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from "moment";
import { User } from '@root/common/models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const backend: string = environment.backend;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  user: User;
  passphrase: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) { this.ngOnInit() }
  
  async ngOnInit() {
    this.user = new User();
    this.passphrase = localStorage.getItem('passphrase');
    const user = localStorage.getItem('user');
    if(user) {
      this.user = new User(JSON.parse(user));
      this.user.passphrase = this.passphrase;
      await this.refresh(this.user);
    }
  }

  async login(user: User) {
    await this.refresh(user);
    this.router.navigate(['/home']);
  }

  async refresh(user: User) {
    return this.http.post(`${backend}/lisk/account`, user)
    .toPromise()
    .then((user: User) => {
      console.log(this.user)
      this.user = new User(user);
      this.user.passphrase = this.passphrase;
      const expiresAt = moment().add(user.expiresIn, 'second');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('expires_at', expiresAt.valueOf().toString());
    }).catch(console.error);
  }

  logout() {
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
    
    this.router.navigate(['/']);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration()) && JSON.parse(localStorage.getItem('user')).address;
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }    

  generalGet(getPath: string = 'testGet') {
    return fetch(`${backend}/${getPath}`);
  }

  addCash() {
    this.http.post(`${backend}/lisk/addCash`, this.user)
    .subscribe(() => {
      console.log('Cash added')
    }, () => {});
  }

}
