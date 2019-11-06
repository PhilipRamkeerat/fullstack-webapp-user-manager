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
  userEmail: string;
  userCPF: string;
  userPhone: string;

  constructor(
    public dialogRef: MatDialogRef<ModalUpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.userName = data.userName;
    this.userEmail = data.userEmail;
    this.userCPF = data.userCPF;
    this.userPhone = data.userPhone;
  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: [this.userName, [Validators.required]],
      userEmail: [this.userEmail, [Validators.required]],
      userCPF: [this.userCPF, [Validators.required]],
      userPhone: [this.userPhone, [Validators.required]]
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
      userEmail: ['', [Validators.required]],
      userCPF: ['', [Validators.required]],
      userPhone: ['', [Validators.required]],
    });
    console.log('Edit Modal After Close', this.form.value)
  }

}
