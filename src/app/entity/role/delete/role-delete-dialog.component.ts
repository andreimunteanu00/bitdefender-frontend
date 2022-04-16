import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {IRole} from "../role.model";
import {RoleService} from "../service/role.service";

@Component({
  selector: 'app-role-delete.dialog',
  templateUrl: './role-delete-dialog.component.html'
})
export class RoleDeleteDialogComponent implements OnInit {

  role?: IRole;

  constructor(
    protected roleService: RoleService,
    protected activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
  }

  confirmDelete(id: number): void {
    this.roleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    })
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
