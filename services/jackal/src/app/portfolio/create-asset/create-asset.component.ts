import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {lorem} from '@root/common/models/Utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Asset } from '@root/common/models/Asset';
import { User } from '@root/common/models/User';
import { AuthService } from '../../core/auth.service';
import { AssetManager } from 'src/app/core/asset-management.service';
import { UtilService } from 'src/app/core/util.service';

const backend: string = environment.backend;
let contentDataUrl: string;

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
    private auth: AuthService,
    private manager: AssetManager,
    private dialog: MatDialog,
    private util: UtilService
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

  async createAsset() {
    this.user.asset.portfolio.push(
      new Asset({
        description: lorem,
        name: 'Euripide',
        value: 0,
        cid: 'https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Fstephenkey%2Ffiles%2F2018%2F01%2FImage-from-Stephen-Keys-patent-1200x1455.jpg'
      }
    ));

    console.log(contentDataUrl);

    this.http.post(`${backend}/lisk/updateUser`, this.user)
    .subscribe(console.log, console.error);

    this.http.post(`${backend}/ipfs/store`, contentDataUrl)
    .subscribe(console.log, console.error);

    this.dialogRef.close();
    // this.dialog.open()

    await this.manager.reloadUserData();
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
