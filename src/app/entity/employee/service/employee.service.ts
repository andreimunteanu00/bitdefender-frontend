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

  getById(id: any): Observable<HttpResponse<IEmployee>> {
    return this.http
      .get<IEmployee>(`${this.url}/${id}`, { observe: "response"})
      .pipe(map((res: HttpResponse<IEmployee>) => this.convertDateFromServer(res)));
  }

  create(employee: IEmployee): Observable<HttpResponse<IEmployee>> {
    return this.http.post<IEmployee>(this.url, employee, { observe: 'response' });
  }

  update(employee: IEmployee): Observable<HttpResponse<IEmployee>> {
    return this.http.put<IEmployee>(`${this.url}/${employee.id as number}`, employee, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>>{
    return this.http.delete(`${this.url}/${id}`, { observe: "response" });
  }

  protected convertDateFromServer(res: HttpResponse<IEmployee>): HttpResponse<IEmployee> {
    if (res.body) {
      res.body.birthDate = res.body.birthDate ? dayjs.unix(res.body.birthDate as unknown as number) : undefined;
    }
    return res;
  }

  getEmployeesThatAreNotManagers() {
    return this.http
      .get<IEmployee[]>(`${this.url}/freemanager`, { observe: "response"});
  }

  protected convertDateArrayFromServer(res: HttpResponse<IEmployee[]>): HttpResponse<IEmployee[]> {
    if (res.body) {
      res.body.forEach((employee: IEmployee) => {
        employee.birthDate = employee.birthDate ? dayjs.unix(employee.birthDate as unknown as number) : undefined;
      })
    }
    return res;
  }
}
