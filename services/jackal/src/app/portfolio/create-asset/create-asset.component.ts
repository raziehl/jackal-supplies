import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Asset, AssetType } from '@root/common/models/Asset';
import { User } from '@root/common/models/User';
import { AuthService } from '../../core/auth.service';
import { AssetManager } from 'src/app/core/asset-management.service';
import { UtilService } from 'src/app/core/util.service';
import { ToastrService } from 'ngx-toastr';

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
  file: File;
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
      issuedControl: [1, Validators.required],
      valueControl: [1, Validators.required],
      typeControl: [''],
      tags: ['']
    });

    this.user = this.auth.user;
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

    try {
      const cidPath = await this.http.post(`${backend}/ipfs/store`, {
        data: contentDataUrl
      }, { responseType: 'text' }).toPromise();

      const portfolioSize = this.auth.user.asset.portfolio.length;
      this.auth.user.asset.portfolio[portfolioSize - 1].cid = cidPath;

      this.dialogRef.close();
      await this.manager.updateUserData(this.user);
    } catch(e) {
      console.log(e.body);
      console.error(e);
    }
  } 

  handleFileInput(files: FileList) {
    let reader = new FileReader();
    this.file = files[0];
    reader.readAsDataURL(files[0]);

    reader.onload = function() {
      contentDataUrl = reader.result.toString();
    };

    reader.onerror = function() {
      reader.error;
    };
  }
}
