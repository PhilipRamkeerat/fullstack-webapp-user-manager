import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAddUserComponent } from './modal-add-user/modal-add-user.component';
import { ModalUpdateUserComponent } from './modal-update-user/modal-update-user.component';



@NgModule({
  declarations: [ModalAddUserComponent, ModalUpdateUserComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ModalAddUserComponent, ModalUpdateUserComponent
  ]
})
export class ComponentsModule { }
