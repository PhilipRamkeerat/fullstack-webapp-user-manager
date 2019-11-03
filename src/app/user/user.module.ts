import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MaterialModule } from '../material.module';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
