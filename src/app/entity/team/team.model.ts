import * as dayjs from 'dayjs';
import {Employee, IEmployee} from '../employee/employee.model';

export interface ITeam {
    id?: number;
    name?: string | null;
    createdDate?: dayjs.Dayjs | null;
    employees?: IEmployee[] | null;
    manager?: IEmployee | null;
}

export class Team implements ITeam {
    constructor(
        public id?: number,
        public name?: string | null,
        public createdDate?: dayjs.Dayjs | null,
        public employees?: IEmployee[] | null,
        public manager?: IEmployee | null
    ) {}
}
