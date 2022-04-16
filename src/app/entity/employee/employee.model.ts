import * as dayjs from 'dayjs';
import {IRole, Role} from "../role/role.model";
import {ITeam, Team} from "../team/team.model";

export interface IEmployee {
  id?: number;
  lastName?: string | null;
  firstName?: string | null;
  email?: string | null;
  birthDate?: dayjs.Dayjs | null;
  roles?: Role[] | null;
  team?: Team | null;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public lastName?: string | null,
    public firstName?: string | null,
    public email?: string | null,
    public birthDate?: dayjs.Dayjs | null,
    public roles?: IRole[] | null,
    public team?: ITeam | null
  ) {}
}
