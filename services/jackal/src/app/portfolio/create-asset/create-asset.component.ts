import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {lorem} from '@root/common/models/Utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Asset, AssetType } from '@root/common/models/Asset';
import { User } from '@root/common/models/User';
import { AuthService } from '../../core/auth.service';
import { AssetManager } from 'src/app/core/asset-management.service';
import { UtilService } from 'src/app/core/util.service';
import { ToastrService } from 'ngx-toastr';

// import ipfsClient = require('ipfs-http-client');

const backend: string = environment.backend;
let contentDataUrl: string;

interface FormObject {
  nameControl: string;
  descriptionControl: string;
  issuedControl: number;
  sellingSharesControl: number;
  valueControl: number;
  typeControl: string;
  tags: string[]
}

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss']
})
export class CreateAssetComponent implements OnInit {

  assetForm: FormGroup;
  user: User;
  ipfs;

  constructor(
    public dialogRef: MatDialogRef<CreateAssetComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private manager: AssetManager,
    private toast: ToastrService,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.assetForm = this.fb.group({
      nameControl: ['', Validators.required],
      descriptionControl: ['', Validators.required],
      issuedControl: ['', Validators.required],
      sellingSharesControl: ['', Validators.required],
      valueControl: ['', Validators.required],
      typeControl: [''],
      tags: ['']
    });

    this.user = this.auth.user;
    
    // this.ipfs = ipfsClient('http://localhost:5001');

    this.test();
  }

  async test() {
    // const chunks = [];
    // for await (const chunk of this.ipfs.cat('QmcjzbkVVpb36WgoNW4ryoaAEcL8e9A98YJqMu67TkWPHQ')) {
    //   chunks.push(chunk)
    // }
    // return Buffer.concat(chunks).toString();
  }

  onSubmit(formValue: FormObject) {
    if(this.assetForm.valid) 
      this.createAsset(formValue);
    else
      this.toast.warning('Some required fields are needed');
  }

  async createAsset(formValue: FormObject) {
    this.auth.user.asset.portfolio.push(new Asset({
      cid: '',
      assetHash: '',
      description: formValue.descriptionControl,
      issued: formValue.issuedControl,
      value: formValue.valueControl,
      name: formValue.nameControl,
      type: AssetType.Bond,
      tags: []
    }));

    this.http.post(`${backend}/lisk/updateUser`, this.user)
    .subscribe(console.log, console.error);

    this.http.post(`${backend}/ipfs/store`, { data:contentDataUrl })
    .subscribe(console.log, console.error);

    this.dialogRef.close();
    await this.manager.updateUserData();
  } 

  handleFileInput(files: FileList) {
    let reader = new FileReader();

    reader.readAsDataURL(files[0]);

    reader.onload = function() {
      contentDataUrl = reader.result.toString();
    };

    reader.onerror = function() {
      reader.error;
    };
  }
}
