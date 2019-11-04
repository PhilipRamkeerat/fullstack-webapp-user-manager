import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddUserComponent } from '../components/modal-add-user/modal-add-user.component';
import { ModalUpdateUserComponent } from '../components/modal-update-user/modal-update-user.component';
import { UserService } from './user.service';
import User from './user';

export interface DialogData {
  '_id': string
  userName: string;
  userDescription: string;
  userPrice: string;
  userLastname: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  // User declaration
  '_id': string;
  userName: string;
  userDescription: string;
  userPrice: string;
  userLastname: string;

  dataSource: MatTableDataSource<User>;

  displayedColumns: string[] = ['_id', 'userName', 'userDescription', 'userPrice', 'userLastname', 'action'];

  editObjectExample = {
    '_id': 'sadhuhsaduhsad',
    userName: 'dasdhsaduas',
    userDescription: 'dasdsad',
    userPrice: 'dasdsa',
    userLastname: 'dasdasdsa'
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {

    this.getUsers();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalAddUserComponent, {
      width: '600px',
      data: { userName: '', userDescription: '', userPrice: '', userLastname: '' }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (!data || data == undefined || (data.userName == '' && data.userDescription == '' && data.userPrice == '' && data.userLastname == '')) {
          console.log('Invalid Datas', data);
          return;
        } else {
          this.userName = data.userName;
          this.userDescription = data.userDescription;
          this.userPrice = data.userPrice;
          this.userLastname = data.userLastname;
          console.log("Valid Log", data);
        }
      }
    );
  }

  editDialog() {
    console.log('edit called success')
    const dialogRef = this.dialog.open(ModalUpdateUserComponent, {
      width: '600px',
      data: {
        '_id': this.editObjectExample._id,
        userName: this.editObjectExample.userName,
        userDescription: this.editObjectExample.userDescription,
        userPrice: this.editObjectExample.userPrice,
        userLastname: this.editObjectExample.userLastname
      }
    });



    dialogRef.afterClosed().subscribe(
      data => {
        if (!data || data == undefined || (data.userName == '' && data.userDescription == '' && data.userPrice == '' && data.userLastname == '')) {
          console.log('Invalid Datas', data);
          return;
        } else {
          this._id = data._id;
          this.userName = data.userName;
          this.userDescription = data.userDescription;
          this.userPrice = data.userPrice;
          this.userLastname = data.userLastname;
          console.log("Valid Log", data);
        }
      }
    );
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        // Insert result get on material table
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.paginator = this.paginator;
        console.log('result', users);
      });
  }

}