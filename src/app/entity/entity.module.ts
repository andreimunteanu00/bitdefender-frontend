import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SortDirective} from "../util/directive/sort.directive";
import {SortByDirective} from "../util/directive/sort-by.directive";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbPaginationModule,
  NgbTooltipModule
} from "@ng-bootstrap/ng-bootstrap";
import {fontAwesomeIcons} from "../util/font-awesome-icons";
import {FormatDatePipe} from "../util/pipe/format-date.pipe";
import {FormatRolePipe} from "../util/pipe/format-role.pipe";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormatEmployeesPipe} from "../util/pipe/format-employees.pipe";


@NgModule({
  declarations: [SortDirective, SortByDirective, FormatDatePipe, FormatRolePipe, FormatEmployeesPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SortDirective,
    SortByDirective,
    FontAwesomeModule,
    NgbPaginationModule,
    NgbTooltipModule,
    FormatDatePipe,
    FormatRolePipe,
    FormatEmployeesPipe,
    RouterModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgSelectModule
  ]
})
export class EntityModule {
  constructor(iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(...fontAwesomeIcons);
  }
}
