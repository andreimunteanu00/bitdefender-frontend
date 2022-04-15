import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from "../list/employee.component";


const petentRoute: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    data: {
      defaultSort: 'id,asc',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(petentRoute)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
