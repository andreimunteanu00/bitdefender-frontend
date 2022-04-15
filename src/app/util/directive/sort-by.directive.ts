import {AfterContentInit, ContentChild, Directive, Host, HostListener, Input, OnDestroy} from "@angular/core";
import {takeUntil} from "rxjs/operators";
import {SortDirective} from "./sort.directive";
import {Subject} from "rxjs";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faSort, faSortDown, faSortUp, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Directive({
  selector: '[sortBy]',
})
export class SortByDirective<T> implements AfterContentInit, OnDestroy {
  @Input() sortBy!: T;

  @ContentChild(FaIconComponent, { static: false })
  iconComponent?: FaIconComponent;

  sortIcon = faSort;
  sortAscIcon = faSortUp;
  sortDescIcon = faSortDown;

  private readonly destroy$ = new Subject<void>();

  constructor(@Host() private sort: SortDirective<T>) {
    sort.predicateChange.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateIconDefinition());
    sort.ascendingChange.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateIconDefinition());
  }

  @HostListener('click')
  onClick(): void {
    if (this.iconComponent) {
      this.sort.sort(this.sortBy);
    }
  }

  ngAfterContentInit(): void {
    this.updateIconDefinition();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateIconDefinition(): void {
    if (this.iconComponent) {
      let icon: IconDefinition = this.sortIcon;
      if (this.sort.predicate === this.sortBy) {
        icon = this.sort.ascending ? this.sortAscIcon : this.sortDescIcon;
      }
      this.iconComponent.icon = icon.iconName;
      this.iconComponent.render();
    }
  }
}
