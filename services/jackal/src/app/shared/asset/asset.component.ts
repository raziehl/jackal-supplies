import { Component, OnInit, Input } from '@angular/core';
import { Asset } from '@root/common/models/Asset';
import { LSK } from '@root/common/models/Utils';
import { AuthService } from '../../core/auth.service';
import { assetDetails } from '../animations';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AssetManager } from 'src/app/core/asset-management.service';
import { UtilService } from 'src/app/core/util.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSellOrderComponent } from '../create-sell-order/create-sell-order.component';

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
  ipfsEndpoint: string;
  imageDataUrl: string;
  isShown = false;
  isPortfolio = false;
  LSK = LSK;

  constructor(
    public auth: AuthService,
    public http: HttpClient,
    public router: Router,
    public manager: AssetManager,
    public util: UtilService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isPortfolio = this.router.url == '/portfolio';
    this.ipfsEndpoint = `${backend}/ipfs/asset/${this.asset.cid}`;
    this.http.get(this.ipfsEndpoint, {responseType: 'text'})
    .subscribe(data => {
      this.imageDataUrl = data;
    }, console.error);
  }

  async createSellOrder() {
    const dialogRef = this.dialog.open(CreateSellOrderComponent, {
      // width: '250px',
      data: this.asset,
    });

    dialogRef.afterClosed().subscribe();
  }

  async destroyAsset() {
    await this.manager.destroyAsset(this.asset.cid);

    this.auth.user.asset.portfolio.splice(this.index, 1);
    await this.manager.updateUserData();
  }

  showDetails() {
    this.isShown = !this.isShown;
  }
}
