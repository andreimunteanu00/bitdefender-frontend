import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from "./route/employee-routing.module";
import {EmployeeComponent} from "./list/employee.component";
import {EntityModule} from "../entity.module";
import {EmployeeUpdateComponent} from './update/employee-update.component';
import {EmployeeDeleteDialogComponent} from './delete/employee-delete-dialog.component';


@NgModule({
  declarations: [EmployeeComponent, EmployeeUpdateComponent, EmployeeDeleteDialogComponent],
  exports: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    EntityModule
  ]
})
export class EmployeeModule { }
