import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from "./route/employee-routing.module";
import {EmployeeComponent} from "./list/employee.component";
import {ItemCountComponent} from "../../util/pagination/item-count.component";
import {EntityModule} from "../entity.module";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [EmployeeComponent, ItemCountComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    EntityModule,
    NgbDropdownModule
  ]
})
export class EmployeeModule { }
