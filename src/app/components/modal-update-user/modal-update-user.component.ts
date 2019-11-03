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
  animal: string;
  telefone: string;
  name: string;
  description: string;

  constructor(
    public dialogRef: MatDialogRef<ModalUpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.animal = data.animal;
    this.telefone = data.telefone;
    this.name = data.name;
    this.description = data.description;
  }

  ngOnInit() {
    this.form = this.fb.group({
      animal: [this.animal, [Validators.required]],
      telefone: [this.telefone, [Validators.required]],
      name: [this.name, [Validators.required]],
      description: [this.description, [Validators.required]]
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
      animal: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    console.log('form after clear', this.form.value)
  }

}
