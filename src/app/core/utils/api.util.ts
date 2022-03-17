import { HttpParams } from '@angular/common/http';

export function anonParam() {
  let param = new HttpParams();
  param = param.append('anon', 'anon');
  return param;
}

export function paginatorParam(offset: number, limit: number) {
  let param = new HttpParams();
  param = param.append('offset', String(offset));
  param = param.append('limit', String(limit));
  return param;
}
