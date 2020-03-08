import { Component, OnInit, Input } from '@angular/core';
import { Asset } from '@root/common/models/Asset';
import { LSK } from '@root/common/models/Utils';
import { AuthService } from '../../core/auth.service';
import { assetDetails } from '../animations';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

const backend = environment.backend;

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
  animations: [assetDetails]
})
export class AssetComponent implements OnInit {

  @Input() asset: Asset;
  @Input() index: number;
  isShown = false;
  isPortfolio = false;
  LSK = LSK;

  constructor(
    public auth: AuthService,
    public http: HttpClient,
    public router: Router
  ) { }

  ngOnInit() {
    this.isPortfolio = this.router.url == '/portfolio';
  }

  destroyAsset() {
    this.auth.user.asset.portfolio.splice(this.index, 1);
    
    this.http.post(`${backend}/lisk/updateUser`, this.auth.user)
    .subscribe(console.log, console.error);
    this.auth.loadingTimeout(3000);
  }

  showDetails(asset: Asset) {
    this.isShown = !this.isShown;
  }
}
