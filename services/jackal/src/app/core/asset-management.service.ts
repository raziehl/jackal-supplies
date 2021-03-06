import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from "moment";
import { User } from '@root/common/models/User';
import { Asset } from '@root/common/models/Asset';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { timeout } from './util.service';
import { SellOrder } from '@root/common/models/Orders';

const backend: string = environment.backend;

@Injectable({
  providedIn: 'root'
})
export class AssetManager implements OnInit {

  private portfolioSubject = new BehaviorSubject<Asset[]>(new Asset()[0]);
  private marketSubject = new BehaviorSubject<Asset[]>(new Asset()[0]);
  portfolio: Observable<Asset[]> = this.portfolioSubject.asObservable();
  marketCatalogue: Observable<Asset[]> = this.marketSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService,
    private auth: AuthService,
  ) { this.ngOnInit() }
  
  ngOnInit() {
    this.portfolioSubject.next(this.auth.user.asset.portfolio);
  }

  async updateUserData(user: User = null) {
    this.http.post(`${backend}/lisk/updateUser`, user || this.auth.user)
    .subscribe(console.log, console.error);

    await this.reloadUserData();
  }

  async destroyAsset(cid: string) {
    return this.http.get(`${backend}/ipfs/destroyAsset/${cid}`)
    .subscribe(console.log, console.error);
  }

  async reloadUserData() {
    this.refreshPortfolio();
    this.toast.info('Asset operation in progress...');
    await timeout();
    this.http.post(`${backend}/lisk/account`, this.auth.user)
    .subscribe((user: User) => {
      this.auth.user = new User(user);
      const expiresAt = moment().add(user.expiresIn, 'second');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('expires_at', expiresAt.valueOf().toString());
      this.refreshPortfolio();
      this.toast.success('Asset was stored');
    },() => {});
  }

  refreshPortfolio() {
    this.portfolioSubject.next(this.auth.user.asset.portfolio);
  }

}
