import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { User } from 'libs/models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  backend = environment.backend;

  // TODO: Forgot Password
  user: User = new User();
  loginForm: FormGroup;

  hide;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    
    this.loginForm = this.fb.group({
      passwordControl: ['', Validators.required]
    });
  }

  login() {
    const val = this.loginForm.value;
 
    this.user.passphrase = val.passwordControl;
    
    if (val.passwordControl) {
      this.auth.login(this.user);
    }
  }

  generate() {
    this.hide = true;
    this.http.get(`${this.backend}/lisk/generate-keys`)
    .subscribe((data: any) => {
      this.loginForm.setValue({passwordControl: data.pass})
    },
    () => {});
  }
}
