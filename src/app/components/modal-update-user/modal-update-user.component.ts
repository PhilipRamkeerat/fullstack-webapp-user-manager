import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../modal-add-user/modal-add-user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-update-user',
  templateUrl: './modal-update-user.component.html',
  styleUrls: ['./modal-update-user.component.css']
})
export class ModalUpdateUserComponent implements OnInit {


  form: FormGroup
  userName: string;
  userDescription: string;
  userPrice: string;
  userLastname: string;

  constructor(
    public dialogRef: MatDialogRef<ModalUpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.userName = data.userName;
    this.userDescription = data.userDescription;
    this.userPrice = data.userPrice;
    this.userLastname = data.userLastname;
  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: [this.userName, [Validators.required]],
      userDescription: [this.userDescription, [Validators.required]],
      userPrice: [this.userPrice, [Validators.required]],
      userLastname: [this.userLastname, [Validators.required]]
    });
  }

  submitClick(): void {
    console.log('valueForm', this.form.value);
    this.dialogRef.close(this.form.value);
  }

  onNoClick(): void {
    this.resetForm();
    this.dialogRef.close();
  }

  resetForm() {
    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      userDescription: ['', [Validators.required]],
      userPrice: ['', [Validators.required]],
      userLastname: ['', [Validators.required]],
    });
    console.log('Edit Modal After Close', this.form.value)
  }

}
