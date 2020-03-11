import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Asset } from '@root/common/models/Asset';
import { lorem, LSK } from '@root/common/models/Utils';
import { assetDetails } from '../shared/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { User } from '@root/common/models/User';
import { AssetManager } from '../core/asset-management.service';
import { UtilService } from '../core/util.service';
@Component({
  selector: 'app-portforlio',
  animations: [assetDetails],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  exampleObject: Asset;
  lorem = lorem;
  user: User;
  assets: Asset[];

  isHandset = this.breakpointObserver
  .observe('(max-width: 768px)');
  
  // isHandset = this.breakpointObserver.isMatched('(max-width: 768px)');

  constructor(
    public auth: AuthService,
    public manager: AssetManager,
    public util: UtilService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.user = this.auth.user;
    this.assets = this.user.asset.portfolio;
  }

  createAsset() {
    const dialogRef = this.dialog.open(CreateAssetComponent, {
      // width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe();
  }

}
