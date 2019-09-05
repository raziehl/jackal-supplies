import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from "moment";
import { User } from 'libs/models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  backend: string = environment.backend;
  user: User;
  passphrase: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) { this.ngOnInit() }
  
  ngOnInit() {
    this.user = new User();
    const user = localStorage.getItem('user');
    const passphrase = localStorage.getItem('passphrase');
    if(user)
      this.user = JSON.parse(user);
    if(passphrase)
      this.passphrase = passphrase;
    this.login(this.user);
  }

  login(user: User) {
    this.http.post(`${this.backend}/lisk/account`, user)
    .subscribe((user: User) => {
      this.user = user;
      this.user.username = user.asset.user.username;
      console.log(user);
      const expiresAt = moment().add(user.expiresIn, 'second');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('expires_at', expiresAt.valueOf().toString());
      return this.router.navigate(['/home']);
    },() => {});
  }

  logout() {
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
    
    this.router.navigate(['/']);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }    

  generalGet(getPath: string = 'testGet') {
    return fetch(`${this.backend}/${getPath}`);
  }
}
