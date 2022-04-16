import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from "../list/employee.component";
import {EmployeeUpdateComponent} from "../update/employee-update.component";


const employeeRoute: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    data: {
      defaultSort: 'id,asc',
    }
  },
  {
    path: 'new',
    component: EmployeeUpdateComponent,
  },
  {
    path: ':id/edit',
    component: EmployeeUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(employeeRoute)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
