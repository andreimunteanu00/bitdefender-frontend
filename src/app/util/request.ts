import {HttpParams} from "@angular/common/http";

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        options = options.set(key, req[key]);
      }
    });

    if (req.query) {
      req.query.forEach((val: string) => {
        const queryParam = val.split('=', 2);
        options = options.append(queryParam[0], queryParam[1]);
      });
    }

    if (req.sort) {
      req.sort.forEach((val: string) => {
        options = options.append('sort', val);
      });
    }
  }
  return options;
};
