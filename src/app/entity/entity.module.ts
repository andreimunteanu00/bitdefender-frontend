import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SortDirective} from "../util/directive/sort.directive";
import {SortByDirective} from "../util/directive/sort-by.directive";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ItemCountComponent} from "../util/pagination/item-count.component";
import {NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {fontAwesomeIcons} from "../util/font-awesome-icons";
import {FormatDatePipe} from "../util/pipe/format-date.pipe";
import {FormatRolePipe} from "../util/pipe/formatRole.pipe";



@NgModule({
  declarations: [SortDirective, SortByDirective, FormatDatePipe, FormatRolePipe],
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
    FormatRolePipe
  ]
})
export class EntityModule {
  constructor(iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(...fontAwesomeIcons);
  }
}
