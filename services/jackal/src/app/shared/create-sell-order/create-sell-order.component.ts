import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../app/core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SellOrder } from '@root/common/models/Orders';
import { Asset } from '@root/common/models/Asset';
import { environment } from '../../../environments/environment';

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
    @Inject(MAT_DIALOG_DATA) public data: Asset,
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
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


  createSellOrder(formValue: FormObject) {
    const sellOrder: SellOrder = new SellOrder({
      askingPrice: formValue.valueControl,
      assetId: this.data.assetHash,
      cid: this.data.cid,
      created_at: new Date(),
      sellerId: this.auth.user.address,
      id: this.auth.user.address + (+new Date()),
      assetData: this.data,
      fulfilled: false
    });

    this.http.post(`${backend}/lisk/sell-order`, { sellOrder, passphrase: this.auth.user.passphrase })
    .subscribe(console.log, console.error);
  }

}
