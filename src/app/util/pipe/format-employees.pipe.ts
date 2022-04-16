import {Pipe, PipeTransform} from "@angular/core";
import * as dayjs from "dayjs";
import {IRole} from "../../entity/role/role.model";
import {IEmployee} from "../../entity/employee/employee.model";

@Pipe({
  name: 'formatEmployees',
})
export class FormatEmployeesPipe implements PipeTransform {
  transform(employees: IEmployee[] | null | undefined): string {
    const employeeString: string[] = [];
    employees?.forEach((employee: IEmployee) => {
      employeeString.push(employee.lastName! + ' ' + employee.firstName!);
    })
    return employeeString!.join(', ');
  }
}
