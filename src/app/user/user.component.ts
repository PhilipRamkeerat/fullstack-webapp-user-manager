import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddUserComponent } from '../components/modal-add-user/modal-add-user.component';
import { ModalUpdateUserComponent } from '../components/modal-update-user/modal-update-user.component';
import { UserService } from './user.service';
import User from './user';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  // Search
  searchWord: string;

  // Tooltip Position
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  positionRight = new FormControl(this.positionOptions[5]);
  positionLeft = new FormControl(this.positionOptions[4]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private userService: UserService, private _snackBar: MatSnackBar) { }

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
          this.addUser(data);
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

  addUser(user: User) {
    this.userService.addUser(user).subscribe(
      _ => {
        this.openSnackBar(`User ${user.userName} successfully added!`, 'OK');
        this.getUsers();
      });
  }

  getUser(id) {
    this.userService.getUser(id).subscribe(res => {
      console.log('res getUser', res);
    });
  }

  updateUser(user: User) {
    this.userService.updateUser(user, user._id).subscribe(
      _ => {
        this.openSnackBar(`User ${user.userName} successfully updated!`, 'OK');
        this.getUsers();
      });
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(res => {
      this.openSnackBar(`User successfully removed!`, 'OK');
      this.getUsers();
    });
  }

  searchUser(word: string) {
    word = this.searchWord;
    if (!word) {
      this.openSnackBar(`Search field is empty !`, 'OK');
      this.getUsers();
    } else {
      this.userService.searchUser(word).subscribe(
        data => {
          console.log('pesquisa vazia', data);
          if (data.length === 0) {
            this.openSnackBar(`Search ${word} not found!`, 'OK');
            this.getUsers();
          } else {
            this.dataSource = new MatTableDataSource<User>(data);
            this.dataSource.paginator = this.paginator;
          }
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
