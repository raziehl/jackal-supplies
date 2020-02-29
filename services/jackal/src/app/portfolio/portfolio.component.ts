import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Asset } from '@root/common/models/Asset';
import { lorem, LSK } from '@root/common/models/Utils';
import { assetDetails } from '../shared/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { User } from '@root/common/models/User';
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
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.exampleObject = new Asset({
      name: "Prototypical Cock Future",
      description: lorem.substring(0, 100),
      cid: 'https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Fstephenkey%2Ffiles%2F2018%2F01%2FImage-from-Stephen-Keys-patent-1200x1455.jpg'
    });
    this.user = this.auth.user;
    this.assets = this.user.asset.portfolio;
    console.log(this.assets)
  }

  createAsset() {
    const dialogRef = this.dialog.open(CreateAssetComponent, {
      // width: '250px',
      data: {name: 'PIZDA', animal: 'MARIJUANA'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}