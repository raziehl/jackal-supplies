import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      nameControl: ['', Validators.required]
    });
  }

  createAsset() {
    console.log(this.assetForm.value);
  } 

}
