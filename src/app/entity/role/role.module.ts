import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleRoutingModule} from "./route/role-routing.module";
import {EntityModule} from "../entity.module";
import {RoleUpdateComponent} from './update/role-update.component';
import {RoleDeleteDialogComponent} from './delete/role-delete-dialog.component';


@NgModule({
  declarations: [
    RoleUpdateComponent,
    RoleDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    EntityModule
  ]
})
export class RoleModule { }
