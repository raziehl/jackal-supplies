import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';
import { User } from '@root/libs/models/User';

const backend = environment.backend;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;
  user: User;
  loading;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      usernameControl: ['']
    });
    this.user = this.auth.user;
  }

  saveSettings() {
    const userSettings = this.settingsForm.value;

    this.user.asset.userStuff.username = userSettings.usernameControl;

    this.http.post(`${backend}/lisk/updateUser`, this.user)
    .subscribe((user: User) => {
      console.log(user)
      this.auth.user = user;
    },() => {});
  }

}
