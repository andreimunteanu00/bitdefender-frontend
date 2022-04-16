import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleComponent} from "../list/role.component";
import {RoleUpdateComponent} from "../update/role-update.component";


const roleRoute: Routes = [
  {
    path: '',
    component: RoleComponent,
    data: {
      defaultSort: 'id,asc',
    }
  },
  {
    path: 'new',
    component: RoleUpdateComponent,
  },
  {
    path: ':id/edit',
    component: RoleUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(roleRoute)],
  exports: [RouterModule],
})
export class RoleRoutingModule {}
