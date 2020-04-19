import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SellOrder, BuyOrder } from '../../../../../common/models/Orders';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../app/core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

const backend = environment.backend;

interface FormObject {
  valueControl: number;
}

@Component({
  selector: 'app-create-buy-order',
  templateUrl: './create-buy-order.component.html',
  styleUrls: ['./create-buy-order.component.scss']
})
export class CreateBuyOrderComponent implements OnInit {

  buyOrderForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateBuyOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SellOrder,
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private toast: ToastrService
   ) { }

  ngOnInit(): void {
    this.buyOrderForm = this.fb.group({
      valueControl: [1, Validators.required]
    });
  }
  
  onSubmit(formValue: FormObject) {
    if(this.buyOrderForm.valid) 
      this.createBuyOrder(formValue);
    else
      this.toast.warning('Some required fields are needed');
  }


  createBuyOrder(formValue: FormObject) {
    const buyOrder: BuyOrder = new BuyOrder({
      id: this.auth.user.address + (+new Date()),
      offeredPrice: formValue.valueControl,
      assetId: this.data.assetId,
      cid: this.data.cid,
      created_at: new Date(),
      sellerId: this.auth.user.address,
    });

    this.http.post(`${backend}/lisk/buy-order`, { buyOrder, passphrase: this.auth.user.passphrase })
    .subscribe(console.log, console.error);
  }
}
