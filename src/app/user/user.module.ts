import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MaterialModule } from '../material.module';
import { Router, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    HttpClientModule
  ],
  exports: [
    UserComponent
  ],
  entryComponents: [
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
