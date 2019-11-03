import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAddUserComponent } from './modal-add-user/modal-add-user.component';
import { ModalUpdateUserComponent } from './modal-update-user/modal-update-user.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [ModalAddUserComponent, ModalUpdateUserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalAddUserComponent, ModalUpdateUserComponent
  ],
  entryComponents: [
    ModalAddUserComponent,
    ModalUpdateUserComponent
  ]
})
export class ComponentsModule { }
