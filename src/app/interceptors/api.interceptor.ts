import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

import { environment } from '../../environments/environment';

export const ApiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const url = environment.API_URL;

  const apiReq = req.clone({
    url: `${url}${req.url}`,
  });

  return next(apiReq);
};
