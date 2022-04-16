import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RoleService} from "../service/role.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {IRole, Role} from "../../role/role.model";
import {finalize} from "rxjs/operators";
import Swal from "sweetalert2";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss']
})
export class RoleUpdateComponent implements OnInit {

  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, Validators.required],
    createdDate: [null, Validators.required]
  });

  constructor(
    protected fb: FormBuilder,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id= this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.roleService.getById(id).subscribe(res => {
        this.updateForm(res.body!);
      })
    }
  }

  save(): void {
    this.isSaving = true;
    const county = this.createFromForm();
    if (county.id) {
      this.subscribeToSaveResponse(this.roleService.update(county));
    } else {
      this.subscribeToSaveResponse(this.roleService.create(county));
    }
    this.previousState();
  }

  previousState(): void {
    window.history.back();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRole>>): void {
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

  protected updateForm(role: IRole): void {
    this.editForm.patchValue({
      id: role.id,
      name: role.name,
      createdDate: role.createdDate ? role.createdDate.format('YYYY-MM-DD') : null,
    });
  }

  protected createFromForm(): IRole {
    return {
      ...new Role(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value ? dayjs(this.editForm.get(['createdDate'])?.value, 'YYYY-MM-DD') : undefined,
    };
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
}
