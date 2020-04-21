import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../app/core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SellOrder } from '@root/common/models/Orders';
import { Asset } from '@root/common/models/Asset';
import { environment } from '../../../environments/environment';
import { AssetManager } from 'src/app/core/asset-management.service';

const backend = environment.backend;

interface FormObject {
  valueControl: number;
  noSellControl: number;
}

@Component({
  selector: 'app-create-sell-order',
  templateUrl: './create-sell-order.component.html',
  styleUrls: ['./create-sell-order.component.scss']
})
export class CreateSellOrderComponent implements OnInit {

  sellOrderForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateSellOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {asset: Asset, index: number},
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private manager: AssetManager,
    private toast: ToastrService
   ) { }

  ngOnInit(): void {
    this.sellOrderForm = this.fb.group({
      noSellControl: [1, Validators.required],
      valueControl: [1, Validators.required],
    });
  }
  
  onSubmit(formValue: FormObject) {
    if(this.sellOrderForm.valid) 
      this.createSellOrder(formValue);
    else
      this.toast.warning('Some required fields are needed');
  }


  async createSellOrder(formValue: FormObject) {
    const sellOrder: SellOrder = new SellOrder({
      askingPrice: formValue.valueControl,
      assetId: this.data.asset.assetHash,
      cid: this.data.asset.cid,
      created_at: new Date(),
      sellerId: this.auth.user.address,
      id: this.auth.user.address + (+new Date()),
      assetData: this.data.asset,
      fulfilled: false
    });

    this.dialogRef.close();
    try {
      await this.http.post(`${backend}/lisk/sell-order`, { sellOrder, passphrase: this.auth.user.passphrase })
      .toPromise();
      await this.removeAsset(this.data.asset.cid);
    } catch(err) {
      console.error(err);
      this.toast.error(err.message);
    }
  }

  async removeAsset(assetCid: string) {
    await this.manager.destroyAsset(assetCid);

    this.auth.user.asset.portfolio.splice(this.data.index, 1);
    await this.manager.updateUserData();
    this.auth.refresh(this.auth.user);
  }

}
