import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    redirectTo: "employees"
  },
  {
    path: 'employees',
    data: { pageTitle: 'Employees' },
    loadChildren: () => import('./entity/employee/employee.module').then(m => m.EmployeeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
