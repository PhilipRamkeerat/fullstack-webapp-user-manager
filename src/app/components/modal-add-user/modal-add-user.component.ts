import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalUpdateUserComponent } from '../modal-update-user/modal-update-user.component';


export interface DialogData {
  animal: string;
  name: string;
  telefone: string;
  description: string;
}

@Component({
  selector: 'app-modal-add-user',
  templateUrl: './modal-add-user.component.html',
  styleUrls: ['./modal-add-user.component.css']
})
export class ModalAddUserComponent implements OnInit {

  name: string;
  animal: string;
  telefone: string;
  description: string;
  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ModalUpdateUserComponent, {
      width: '600px',
      data: { name: '', animal: '', telefone: '', description: '' }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (!data || data == undefined || (data.name == '' && data.animal == '' && data.telefone == '' && data.description == '')) {
          console.log('Invalid Datas', data);
          return;
        } else {
          this.name = data.name;
          this.animal = data.animal;
          this.telefone = data.telefone;
          this.description = data.description;
          console.log("Valid Log", data);
        }
      }
    );
  }

  ngOnInit() {
  }

}
