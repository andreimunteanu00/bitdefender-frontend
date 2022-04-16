import {Component, OnInit} from '@angular/core';
import {IEmployee} from "../employee.model";
import {EmployeeService} from "../service/employee.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-employee-delete-dialog',
  templateUrl: './employee-delete-dialog.component.html'
})
export class EmployeeDeleteDialogComponent implements OnInit {

  employee?: IEmployee;

  constructor(
    protected employeeService: EmployeeService,
    protected activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
  }

  confirmDelete(id: number): void {
    this.employeeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    })
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
