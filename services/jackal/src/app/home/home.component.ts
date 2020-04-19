import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';
import { Asset } from '../../../../common/models/Asset';
import { SellOrder, BuyOrder } from '../../../../common/models/Orders';
import { UtilService } from '../core/util.service';
import { BreakpointObserver } from '@angular/cdk/layout';
const backend = environment.backend;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offers: SellOrder[];

  isHandset = this.breakpointObserver
  .observe('(max-width: 768px)');

  constructor(
    public http: HttpClient,
    public auth: AuthService,
    public util: UtilService,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.getOffers();
  }

  testLogin() {
    this.http.post(`${backend}/lisk/login`, this.auth.user)
    .subscribe((data) => {
      console.log(data)
    }, () => {});
  }

  getOffers() {
    this.http.get(`${backend}/lisk/orders`)
    .subscribe((sellOrders: SellOrder[]) => {
      this.offers = sellOrders;
    },console.error);
  }
}
