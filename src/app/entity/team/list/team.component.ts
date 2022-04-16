import {Component, OnInit} from '@angular/core';
import {ASC, DESC, ITEMS_PER_PAGE, SORT} from "../../../util/constants";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {EmployeeDeleteDialogComponent} from "../../employee/delete/employee-delete-dialog.component";
import Swal from "sweetalert2";
import {combineLatest} from "rxjs";
import {ITeam} from "../team.model";
import {TeamService} from "../service/team.service";
import {IEmployee} from "../../employee/employee.model";
import {TeamDeleteDialogComponent} from "../delete/team-delete-dialog.component";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teams: ITeam[] | undefined;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  isLoading = false;
  ngbPaginationPage = 1;

  constructor(
    private teamservice: TeamService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.handleNavigation();
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.teamservice
      .get({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<ITeam[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        () => {
          this.isLoading = false;
          this.onError();
        }
      );
  }

  delete(team: ITeam): void {
    const modalRef = this.modalService.open(TeamDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.team = team;
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 3000,
        })
        this.loadPage();
      }
    });
  }

  concatenateEmployees(employees: IEmployee[]) {
    return employees.map(value => value.lastName + ' ' + value.firstName).join(', ');
  }

  protected onSuccess(data: ITeam[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/team'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.teams = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

}
