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
    // this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalAddUserComponent, {
      width: '600px',
      data: { '_id': '', userName: '', userDescription: '', userPrice: '', userLastname: '' }
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
        // console.log('getProducts', this.users);
        // this.users = users;
        // console.log(users);
        // return;
        this.dataSource = new MatTableDataSource<User>(users);
        console.log('result', users);
      });
  }

}

export interface PeriodicElement {
  '_id': string
  userName: string;
  userDescription: string;
  userPrice: string;
  userLastname: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { '_id': '2312323212', userName: 'Hydrogen Dos Santos Rodrigues Ramkeerat', userDescription: '1.0079', userPrice: 'H', userLastname: 'LastName Mock' },
  { '_id': '2312323212', userName: 'Helium  Dos Santos Rodrigues', userDescription: '4.0026', userPrice: 'He', userLastname: 'LastName Mock' },
  { '_id': '2312323212', userName: 'Lithium  Dos Santos Rodrigues', userDescription: '6.941', userPrice: 'Li', userLastname: 'LastName Mock' },
  { '_id': '2312323212', userName: 'Beryllium  Dos Santos Rodrigues', userDescription: '9.0122', userPrice: 'Be', userLastname: 'LastName Mock' },
  { '_id': '2312323212', userName: 'Boron  Dos Santos Rodrigues', userDescription: '10.811', userPrice: 'B', userLastname: 'LastName Mock' },
  { '_id': '2312323212', userName: 'Carbon  Dos Santos Rodrigues', userDescription: '12.0107', userPrice: 'C', userLastname: 'LastName Mock' },
  { '_id': '2312323212', userName: 'Nitrogen  Dos Santos Rodrigues', userDescription: '14.0067', userPrice: 'N', userLastname: 'LastName Mock' },
  { '_id': '2312323212', userName: 'Oxygen  Dos Santos Rodrigues', userDescription: '15.9994', userPrice: 'O', userLastname: 'LastName Mock' },
  { '_id': '2312323212', userName: 'Fluorine  Dos Santos Rodrigues', userDescription: '18.9984', userPrice: 'F', userLastname: 'LastName Mock' },
];

