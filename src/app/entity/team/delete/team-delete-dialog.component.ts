import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ITeam} from "../team.model";
import {TeamService} from "../service/team.service";

@Component({
  selector: 'app-team-delete-dialog',
  templateUrl: './team-delete-dialog.component.html',
  styles: []
})
export class TeamDeleteDialogComponent implements OnInit {

  team?: ITeam;

  constructor(protected teamService: TeamService,  protected activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  confirmDelete(id: number): void {
    this.teamService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    })
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
