import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddUserComponent } from '../components/modal-add-user/modal-add-user.component';
import { ModalUpdateUserComponent } from '../components/modal-update-user/modal-update-user.component';
import { UserService } from './user.service';
import User from './user';

// Interface for Material Modal
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

  editObjectExample: User;
  // Mock Object User By Id
  // editObjectExample = {
  //   '_id': 'sadhuhsaduhsad',
  //   userName: 'dasdhsaduas',
  //   userDescription: 'dasdsad',
  //   userPrice: 'dasdsa',
  //   userLastname: 'dasdasdsa'
  // }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  // Material modal for register a new user
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
          this.addProduct(data);
        }
      }
    );
  }

  editDialog(element: any) {
    // this.getUser(id);
    console.log('element', element);

    const dialogRef = this.dialog.open(ModalUpdateUserComponent, {
      width: '600px',
      data: {
        '_id': element._id,
        userName: element.userName,
        userDescription: element.userDescription,
        userPrice: element.userPrice,
        userLastname: element.userLastname
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (!data || data == undefined || (data.userName == '' && data.userDescription == '' && data.userPrice == '' && data.userLastname == '')) {
          console.log('Invalid Datas', data);
          return;
        } else {
          this.updateUser(data);
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

  addProduct(user: User) {
    this.userService.addUser(user).subscribe(
      _ => {
        this.getUsers();
      });
  }

  getUser(id) {
    const idProduct = id;
    this.userService.getUser(id).subscribe(res => {
      console.log('res getUser', res);
    });
  }

  updateUser(user: User) {
    this.userService.updateUser(user, user._id).subscribe(
      _ => {
        this.getUsers();
      });
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(res => {
      this.getUsers();
    });
  }

}