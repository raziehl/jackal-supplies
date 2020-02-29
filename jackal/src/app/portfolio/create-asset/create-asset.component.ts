import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as sizeof from 'json-size';
import {lorem} from '@root/common/models/Utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Asset } from '@root/common/models/Asset';
import { User, AssetBlock } from '@root/common/models/User';
import { AuthService } from '../../core/auth.service';
const b64 = {
  a: 2,
  b: 'Dorian',
  c: 764534636,
  d: 90325346354643634564564645
};

// const g64: User = new User({asset: new AssetBlock({portfolio: [new Asset({description: lorem, name: 'Euripide'})]})});


const backend: string = environment.backend;

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss']
})
export class CreateAssetComponent implements OnInit {

  assetForm: FormGroup;
  user: User;

  constructor(
    public dialogRef: MatDialogRef<CreateAssetComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.assetForm = this.fb.group({
      nameControl: ['', Validators.required],
      descriptionControl: ['', Validators.required],
      issuedControl: ['', Validators.required],
      sellingSharesControl: ['', Validators.required],
      valueControl: ['', Validators.required],
      typeControl: ['', Validators.required],
      tags: ['', Validators.required]
    });

    this.user = this.auth.user;
  }

  createAsset() {
    console.log(this.assetForm.value);
    this.user.asset.portfolio.push(
      new Asset({
        description: lorem,
        name: 'Euripide',
        value: 0,
        cid: 'https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Fstephenkey%2Ffiles%2F2018%2F01%2FImage-from-Stephen-Keys-patent-1200x1455.jpg'
    }))
    this.http.post(`${backend}/lisk/updateUser`, this.user)
    .subscribe((data) => {
      console.log(data)
    },() => {});
  } 

  onFileSelect($event) {
    
  }
}
