import { HttpInterceptorFn } from '@angular/common/http';

 //const BASE_URL = 'http://172.16.100.71:5221/api';

  const BASE_URL ='/api';


export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('http')) {
    return next(req); 
  }

  const updatedReq = req.clone({
    url: `${BASE_URL}/${req.url}`
  });

  return next(updatedReq);
};
