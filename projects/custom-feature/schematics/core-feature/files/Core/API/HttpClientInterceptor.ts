import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { LocalSorageService } from '../Services/localSrorage/LocalStorage.service';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(private $localStorage: LocalSorageService) {

  }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.$localStorage.getToken();
    console.log('jwt token ' + token);
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + token)
      });
      console.log("request " ,cloned);
      return next.handle(cloned).pipe(catchError(x=> this.handleAuthError(x)));
    }
    else {
      return next.handle(req);
    }
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if(err.status === 403){
      this.$localStorage.clear();
      return throwError(() => new Error("Token expired"));
    }
    return throwError(() => new Error("Non Authenticationn Error"));
  }

}