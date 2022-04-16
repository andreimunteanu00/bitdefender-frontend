import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Employee, IEmployee} from "../employee.model";
import {EmployeeService} from "../service/employee.service";
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import Swal from "sweetalert2";
import {RoleService} from "../../role/service/role.service";
import {IRole} from "../../role/role.model";
import {ActivatedRoute} from "@angular/router";
import * as dayjs from "dayjs";
import {ITeam} from "../../team/team.model";
import {TeamService} from "../../team/service/team.service";

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {

  isSaving = false;
  roles: IRole[] = [];
  teams: ITeam[] = [];

  editForm = this.fb.group({
    id: [],
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    email: ['', Validators.required],
    birthDate: ['', Validators.required],
    roles: ['', Validators.required],
    team: ['', Validators.required]
  });

  constructor(
    protected fb: FormBuilder,
    protected employeeService: EmployeeService,
    private roleService: RoleService,
    private teamService: TeamService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id= this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.employeeService.getById(id).subscribe(res => {
        this.updateForm(res.body!);
      })
    }
    this.roleService.get().subscribe(res => {
      this.roles = res.body!;
    })
    this.teamService.get().subscribe(res => {
      this.teams = res.body!;
    })
  }

  save(): void {
    this.isSaving = true;
    const county = this.createFromForm();
    if (county.id) {
      this.subscribeToSaveResponse(this.employeeService.update(county));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(county));
    }
    this.previousState();
  }

  previousState(): void {
    window.history.back();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployee>>): void {
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
  }

  protected onSaveError(): void {
    Swal.fire({
      icon: 'error',
      showConfirmButton: false,
      timer: 3000,
    });
    this.isSaving = false;
  }

  protected updateForm(employee: IEmployee): void {
    this.editForm.patchValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      birthDate: employee.birthDate ? employee.birthDate.format('YYYY-MM-DD') : null,
      roles: employee.roles,
      team: employee.team
    });
  }

  protected createFromForm(): IEmployee {
    return {
      ...new Employee(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      birthDate: this.editForm.get(['birthDate'])!.value ? dayjs(this.editForm.get(['birthDate'])?.value, 'YYYY-MM-DD') : undefined,
      email: this.editForm.get(['email'])!.value,
      roles: this.editForm.get(['roles'])!.value,
      team: this.editForm.get(['team'])!.value,
    };
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

}
