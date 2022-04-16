import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamComponent} from "../list/team.component";
import {TeamUpdateComponent} from "../update/team-update.component";


const teamRoute: Routes = [
  {
    path: '',
    component: TeamComponent,
    data: {
      defaultSort: 'id,asc',
    }
  },
  {
    path: 'new',
    component: TeamUpdateComponent,
  },
  {
    path: ':id/edit',
    component: TeamUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(teamRoute)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
