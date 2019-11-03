import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';
const backend = environment.backend;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public http: HttpClient,
    public auth: AuthService
  ) {}

  ngOnInit() {}

  testLogin() {
    this.http.post(`${backend}/lisk/login`, this.auth.user)
    .subscribe((data) => {
      console.log(data)
    }, () => {});
  }
}
