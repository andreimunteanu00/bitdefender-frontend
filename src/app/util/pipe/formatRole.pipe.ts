import {Pipe, PipeTransform} from "@angular/core";
import * as dayjs from "dayjs";
import {IRole} from "../../entity/role/role.model";

@Pipe({
  name: 'formatRole',
})
export class FormatRolePipe implements PipeTransform {
  transform(roles: IRole[] | null | undefined): string {
    const rolesString: string[] = [];
    roles?.forEach((role: IRole) => {
      rolesString.push(role.name!);
    })
    return rolesString!.join(', ');
  }
}
