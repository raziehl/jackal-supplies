import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from "moment";
import { User, UserInfo } from '@root/common/models/User';
import { Asset } from '@root/common/models/Asset';
import { isEmptyObject } from '@root/common/models/Utils';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const backend: string = environment.backend;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) { this.ngOnInit() }
  
  ngOnInit() {
    this.user = new User();
    const user = localStorage.getItem('user');
    const passphrase = localStorage.getItem('passphrase');
    if(user) {
      this.user = new User(JSON.parse(user));
      this.refresh(this.user);
    }
  }

  login(user: User) {
    this.http.post(`${backend}/lisk/account`, user)
    .subscribe((user: User) => {
      this.user = new User(user);
      const expiresAt = moment().add(user.expiresIn, 'second');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('expires_at', expiresAt.valueOf().toString());
      this.router.navigate(['/home']);
    },() => {});
  }

  refresh(user: User) {
    this.http.post(`${backend}/lisk/account`, user)
    .subscribe((user: User) => {
      this.user = new User(user);
      const expiresAt = moment().add(user.expiresIn, 'second');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('expires_at', expiresAt.valueOf().toString());
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
    return fetch(`${backend}/${getPath}`);
  }

  addCash() {
    this.http.post(`${backend}/lisk/addCash`, this.user)
    .subscribe(() => {
      console.log('Cash added')
    }, () => {});
  }
}
