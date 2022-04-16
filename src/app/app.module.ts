import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoleComponent} from './entity/role/list/role.component';
import {TeamComponent} from './entity/team/list/team.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './util/navbar/navbar.component';
import {EmployeeModule} from "./entity/employee/employee.module";
import {EntityModule} from "./entity/entity.module";

@NgModule({
  declarations: [
    AppComponent,
    RoleComponent,
    TeamComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    EmployeeModule,
    EntityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
