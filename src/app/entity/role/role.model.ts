import * as dayjs from 'dayjs';

export interface IRole {
    id?: number;
    name?: string | null;
    createdDate?: dayjs.Dayjs | null;
}

export class Role implements IRole {
    constructor(
        public id?: number,
        public name?: string | null,
        public createdDate?: dayjs.Dayjs | null
    ) {}
}
