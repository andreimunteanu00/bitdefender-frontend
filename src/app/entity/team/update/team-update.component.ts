import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {finalize} from "rxjs/operators";
import Swal from "sweetalert2";
import * as dayjs from "dayjs";
import {TeamService} from "../service/team.service";
import {ITeam, Team} from "../team.model";
import {IEmployee} from "../../employee/employee.model";
import {EmployeeService} from "../../employee/service/employee.service";

@Component({
  selector: 'app-team-update',
  templateUrl: './team-update.component.html',
  styleUrls: ['./team-update.component.scss']
})
export class TeamUpdateComponent implements OnInit {

  isSaving = false;
  employees: IEmployee[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, Validators.required],
    createdDate: [null, Validators.required],
    employees: [],
    manager: []
  });

  constructor(
    protected fb: FormBuilder,
    protected teamService: TeamService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id= this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.teamService.getById(id).subscribe(res => {
        this.updateForm(res.body!);
      })
    }
    this.employeeService.getEmployeesThatAreNotManagers().subscribe(res=> {
      this.employees = res.body!;
    })
  }

  save(): void {
    this.isSaving = true;
    const county = this.createFromForm();
    if (county.id) {
      this.subscribeToSaveResponse(this.teamService.update(county));
    } else {
      this.subscribeToSaveResponse(this.teamService.create(county));
    }
  }

  previousState(): void {
    window.history.back();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeam>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      timer: 3000,
    });
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    Swal.fire({
      icon: 'error',
      showConfirmButton: false,
      timer: 3000,
    });
    this.isSaving = false;
    this.previousState();
  }

  protected updateForm(team: ITeam): void {
    this.editForm.patchValue({
      id: team.id,
      name: team.name,
      createdDate: team.createdDate ? team.createdDate.format('YYYY-MM-DD') : null,
      manager: team.manager,
      employees: team.employees
    });
  }

  protected createFromForm(): ITeam {
    return {
      ...new Team(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value ? dayjs(this.editForm.get(['createdDate'])?.value, 'YYYY-MM-DD') : undefined,
      employees: this.editForm.get(['employees'])!.value,
      manager: this.editForm.get(['manager'])!.value
    };
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
}
