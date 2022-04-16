import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EntityModule} from "../entity.module";
import {TeamRoutingModule} from "./route/team-routing.module";
import {TeamUpdateComponent} from "./update/team-update.component";
import {TeamDeleteDialogComponent} from "./delete/team-delete-dialog.component";



@NgModule({
  declarations: [TeamUpdateComponent, TeamDeleteDialogComponent],
  imports: [
    CommonModule,
    EntityModule,
    TeamRoutingModule
  ]
})
export class TeamModule { }
