import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from "./route/employee-routing.module";
import {EmployeeComponent} from "./list/employee.component";
import {ItemCountComponent} from "../../util/pagination/item-count.component";
import {EntityModule} from "../entity.module";
import {EmployeeUpdateComponent} from './update/employee-update.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { EmployeeDeleteDialogComponent } from './delete/employee-delete-dialog.component';


@NgModule({
  declarations: [EmployeeComponent, ItemCountComponent, EmployeeUpdateComponent, EmployeeDeleteDialogComponent],
  exports: [
    ItemCountComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    EntityModule
  ]
})
export class EmployeeModule { }
