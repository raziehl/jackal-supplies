import { Component, OnInit, Input } from '@angular/core';
import { Asset } from '@root/libs/models/Asset';
import { lorem } from '@root/libs/models/Utils';
import { AuthService } from '../../core/auth.service';
import { assetDetails } from '../animations';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
  animations: [assetDetails]
})
export class AssetComponent implements OnInit {

  @Input() asset: Asset;
  isShown = false;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {}

  showDetails(asset: Asset) {
    this.isShown = !this.isShown;
  }
}
