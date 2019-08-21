import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from "moment";
import { User } from 'libs/models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  serverhost: string = environment.backend;
  user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) { this.ngOnInit() }
  
  ngOnInit() {
    this.user = new User();
    const user_obj = localStorage.getItem('user_obj');
    if(user_obj)
      this.user = JSON.parse(user_obj);
  }

  login(user: User) {
    const loginSubscription = this.http.post<User>(`${this.serverhost}/login`, {
      email: user.email,
      password: user.password
    }).subscribe((authResult) => {
      this.setSession(authResult);
      this.router.navigate(['/domain-control']);
      loginSubscription.unsubscribe();
    }, (err) => {
      this.toast.error(err.message, 'Error');
    });
    return loginSubscription;
  }
  
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    
    this.user = authResult.userObj;
    localStorage.setItem('user_obj', JSON.stringify(authResult.userObj));
    
    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_obj');
    
    this.router.navigate(['/']);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }    

  generalGet(getPath: string = 'testGet') {
    return fetch(`${this.serverhost}/${getPath}`);
  }
}
