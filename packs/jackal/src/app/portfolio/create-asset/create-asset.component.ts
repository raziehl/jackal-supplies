import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as sizeof from 'json-size';
import {lorem} from 'libs/models/Utils';
const b64 = {
  a: 2,
  b: 'Dorian',
  c: 764534636,
  d: 90325346354643634564564645
};

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss']
})
export class CreateAssetComponent implements OnInit {

  assetForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<CreateAssetComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder
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
  }

  createAsset() {
    console.log(this.assetForm.value);
    console.log(lorem)
    console.log(sizeof(lorem))

  } 

  onFileSelect($event) {
    
  }
}
