import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';
import { Asset } from '../../../../common/models/Asset';
import { SellOrder, BuyOrder } from '../../../../common/models/Orders';
const backend = environment.backend;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sellOrders: SellOrder[];

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

  getOffers() {
    this.http.get(`${backend}/lisk/offers`)
    .subscribe((sellOrders: SellOrder[]) => {
      this.sellOrders = sellOrders;
    },console.error);
  }
}
