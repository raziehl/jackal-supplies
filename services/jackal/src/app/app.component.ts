import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
import { UtilService } from './core/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer', {static: false}) public sidenav: MatSidenav;

  constructor(
    public auth: AuthService,
    private router: Router,
    public util: UtilService
  ) {}

  ngOnInit() {
    this.authCheck();
  }

  authCheck() {
    setInterval(() => {
      if(!this.auth.isLoggedIn() && this.router.url !== '/login')
        window.location.reload();
    }, 5000)
  }
}
