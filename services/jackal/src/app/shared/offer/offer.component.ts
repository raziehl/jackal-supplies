import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateBuyOrderComponent } from '../create-buy-order/create-buy-order.component';
import { AuthService } from 'src/app/core/auth.service';
import { HttpClient } from '@angular/common/http';
import { UtilService } from 'src/app/core/util.service';
import { MatDialog } from '@angular/material/dialog';
import { SellOrder, BuyOrder } from '@root/common/models/Orders';
import { LSK } from '@root/common/models/Utils';
import { assetDetails } from '../animations';

const backend = environment.backend;

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  animations: [assetDetails]
})
export class OfferComponent implements OnInit {

  @Input() offer: SellOrder;
  @Input() index: number;
  ipfsEndpoint: string;
  imageDataUrl: string;
  isShown = false;
  isPortfolio = false;
  LSK = LSK;

  constructor(
    public auth: AuthService,
    public http: HttpClient,
    public util: UtilService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.ipfsEndpoint = `${backend}/ipfs/asset/${this.offer.cid}`;
    this.http.get(this.ipfsEndpoint, {responseType: 'text'})
    .subscribe(data => {
      this.imageDataUrl = data;
    }, console.error);
  }

  async createBuyOrder() {
    const buyOrder: BuyOrder = new BuyOrder({
      id: this.auth.user.address + (+new Date()),
      offeredPrice: this.offer.askingPrice,
      assetId: this.offer.assetId,
      cid: this.offer.cid,
      created_at: new Date(),
      sellerId: this.offer.sellerId,
      sellOrderId: this.offer.id
    });

    this.http.post(`${backend}/lisk/buy-order`, { buyOrder, passphrase: this.auth.user.passphrase })
    .subscribe(console.log, console.error);
  }

  showDetails() {
    this.isShown = !this.isShown;
  }

}
