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
  userEmail: string;
  userCPF: string;
  userPhone: string;
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
  userEmail: string;
  userCPF: string;
  userPhone: string;

  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['userName', 'userEmail', 'userCPF', 'userPhone', 'action'];

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
      data: { userName: '', userEmail: '', userCPF: '', userPhone: '' }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (!data || data == undefined || (data.userName == '' && data.userEmail == '' && data.userCPF == '' && data.userPhone == '')) {
          this.openSnackBar(`Invalid Datas !`, 'OK');
          return;
        } else {
          this.userName = data.userName;
          this.userEmail = data.userEmail;
          this.userCPF = data.userCPF;
          this.userPhone = data.userPhone;
          this.addUser(data);
        }
      }
    );
  }

  editDialog(element: any) {
    const dialogRef = this.dialog.open(ModalUpdateUserComponent, {
      width: '600px',
      data: {
        '_id': element._id,
        userName: element.userName,
        userEmail: element.userEmail,
        userCPF: element.userCPF,
        userPhone: element.userPhone
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (!data || data == undefined || (data.userName == '' && data.userEmail == '' && data.userCPF == '' && data.userPhone == '')) {
          this.openSnackBar(`Invalid Datas !`, 'OK');
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
          this.openSnackBar(`Search is empty !`, 'OK');
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
