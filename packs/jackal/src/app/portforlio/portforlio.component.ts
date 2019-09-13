import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Asset } from '@root/libs/models/Asset';
import { lorem, LSK } from '@root/libs/models/Utils';
import { Stonks } from 'libs/models/Stonks';
import { assetDetails } from '../shared/animations';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-portforlio',
  animations: [assetDetails],
  templateUrl: './portforlio.component.html',
  styleUrls: ['./portforlio.component.scss']
})
export class PortforlioComponent implements OnInit {

  exampleObject: Asset;
  lorem = lorem;
  assets: Asset[];

  isHandset = this.breakpointObserver
  .observe('(max-width: 768px)');
  
  // isHandset = this.breakpointObserver.isMatched('(max-width: 768px)');

  constructor(
    public auth: AuthService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.exampleObject = new Asset({
      name: "Prototypical Cock Future",
      description: lorem.substring(0, 100),
      PPS: 225,
      currentShares: 576,
      imageURL: 'https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Fstephenkey%2Ffiles%2F2018%2F01%2FImage-from-Stephen-Keys-patent-1200x1455.jpg'
    });
    this.assets = [this.exampleObject];
  }

  createAsset() {
    
  }
}
