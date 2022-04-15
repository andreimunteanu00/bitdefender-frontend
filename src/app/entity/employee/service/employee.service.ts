import {Injectable} from "@angular/core";
import {SERVER_API_URL} from "../../../util/constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEmployee} from "../employee.model";
import {createRequestOption} from "../../../util/request";
import * as dayjs from "dayjs";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    public url = SERVER_API_URL + 'api/employee'

    constructor(protected http: HttpClient) {}

    get(req?: any): Observable<HttpResponse<IEmployee[]>> {
        const options = createRequestOption(req);
        return this.http
          .get<IEmployee[]>(this.url, { params: options, observe: "response"})
          .pipe(map((res: HttpResponse<IEmployee[]>) => this.convertDateArrayFromServer(res)));
    }

  protected convertDateArrayFromServer(res: HttpResponse<IEmployee[]>): HttpResponse<IEmployee[]> {
    if (res.body) {
      res.body.forEach((employee: IEmployee) => {
        employee.birthDate = employee.birthDate ? dayjs(employee.birthDate) : undefined;
      })
    }
    return res;
  }
}
