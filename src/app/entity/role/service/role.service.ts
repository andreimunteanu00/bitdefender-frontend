import {Injectable} from "@angular/core";
import {SERVER_API_URL} from "../../../util/constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRole} from "../role.model";
import {createRequestOption} from "../../../util/request";
import * as dayjs from "dayjs";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class RoleService {
  public url = SERVER_API_URL + 'api/role'

  constructor(protected http: HttpClient) {}

  get(req?: any): Observable<HttpResponse<IRole[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<IRole[]>(this.url, { params: options, observe: "response"})
      .pipe(map((res: HttpResponse<IRole[]>) => this.convertDateArrayFromServer(res)));
  }

  getById(id: any) {
    return this.http
      .get<IRole>(`${this.url}/${id}`, { observe: "response"})
      .pipe(map((res: HttpResponse<IRole>) => this.convertDateFromServer(res)));
  }
  
  create(role: IRole): Observable<HttpResponse<IRole>> {
    return this.http.post<IRole>(this.url, role, { observe: 'response' });
  }

  update(role: IRole): Observable<HttpResponse<IRole>> {
    return this.http.put<IRole>(`${this.url}/${role.id as number}`, role, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>>{
    return this.http.delete(`${this.url}/${id}`, { observe: "response" });
  }

  protected convertDateFromServer(res: HttpResponse<IRole>): HttpResponse<IRole> {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? dayjs.unix(res.body.createdDate as unknown as number) : undefined;
    }
    return res;
  }
  
  protected convertDateArrayFromServer(res: HttpResponse<IRole[]>): HttpResponse<IRole[]> {
    if (res.body) {
      res.body.forEach((role: IRole) => {
        role.createdDate = role.createdDate ? dayjs.unix(role.createdDate as unknown as number) : undefined;
      })
    }
    return res;
  }
}
