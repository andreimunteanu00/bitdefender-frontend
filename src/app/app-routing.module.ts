import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'employees',
    loadChildren: () => import('./entity/employee/employee.module').then(m => m.EmployeeModule),
  },
  {
    path: 'team',
    loadChildren: () => import('./entity/team/team.module').then(m => m.TeamModule),
  },
  {
    path: 'role',
    loadChildren: () => import('./entity/role/role.module').then(m => m.RoleModule),
  },
  {
    path: '**',
    redirectTo: "employees"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
