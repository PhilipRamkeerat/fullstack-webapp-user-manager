import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../modal-add-user/modal-add-user.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-update-user',
  templateUrl: './modal-update-user.component.html',
  styleUrls: ['./modal-update-user.component.css']
})
export class ModalUpdateUserComponent implements OnInit {

  form: FormGroup
  animal: string;
  telefone: string;
  name: string;

  constructor(
    public dialogRef: MatDialogRef<ModalUpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder) {
    this.animal = data.animal;
    this.telefone = data.telefone;
    this.name = data.name;
  }

  ngOnInit() {
    this.form = this.fb.group({
      animal: [this.animal, []],
      telefone: [this.telefone, []],
      name: [this.name, []],
    });
  }

  submitClick(): void {
    console.log('valueForm', this.form.value);
    this.dialogRef.close(this.form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
