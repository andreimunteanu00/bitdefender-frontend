import {Injectable} from "@angular/core";
import {SERVER_API_URL} from "../../../util/constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITeam} from "../team.model";
import {createRequestOption} from "../../../util/request";
import * as dayjs from "dayjs";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class TeamService {
  public url = SERVER_API_URL + 'api/team'

  constructor(protected http: HttpClient) {}

  get(req?: any): Observable<HttpResponse<ITeam[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<ITeam[]>(this.url, { params: options, observe: "response"})
      .pipe(map((res: HttpResponse<ITeam[]>) => this.convertDateArrayFromServer(res)));
  }

  getById(id: any) {
    return this.http
      .get<ITeam>(`${this.url}/${id}`, { observe: "response"})
      .pipe(map((res: HttpResponse<ITeam>) => this.convertDateFromServer(res)));
  }
  
  create(team: ITeam): Observable<HttpResponse<ITeam>> {
    return this.http.post<ITeam>(this.url, team, { observe: 'response' });
  }

  update(team: ITeam): Observable<HttpResponse<ITeam>> {
    return this.http.put<ITeam>(`${this.url}/${team.id as number}`, team, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>>{
    return this.http.delete(`${this.url}/${id}`, { observe: "response" });
  }

  protected convertDateFromServer(res: HttpResponse<ITeam>): HttpResponse<ITeam> {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? dayjs.unix(res.body.createdDate as unknown as number) : undefined;
    }
    return res;
  }
  
  protected convertDateArrayFromServer(res: HttpResponse<ITeam[]>): HttpResponse<ITeam[]> {
    if (res.body) {
      res.body.forEach((team: ITeam) => {
        team.createdDate = team.createdDate ? dayjs.unix(team.createdDate as unknown as number) : undefined;
      })
    }
    return res;
  }
}
