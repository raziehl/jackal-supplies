import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { User } from '@root/common/models/User';
import { EnrichedPass } from '@root/common/models/EnrichedPass';
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
  loading;

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

  async login() {
    const val = this.loginForm.value;
 
    this.user.passphrase = val.passwordControl;
    
    if (val.passwordControl) {
      localStorage.setItem('passphrase', this.user.passphrase);
      await this.auth.login(this.user);
      this.loading = true;
    }
  }

  generate() {
    this.hide = true;
    this.http.get(`${this.backend}/lisk/generate-keys`)
    .subscribe((pass: EnrichedPass) => {
      this.loginForm.setValue({passwordControl: pass.passphrase})
    },
    () => {});
  }
}
