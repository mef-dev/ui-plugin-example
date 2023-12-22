import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req.clone({
      headers: req.headers
    });

    // @ts-ignore
    if(!environment.production && environment?.['bauth']){
      authReq = req.clone({
        headers: req.headers
            // @ts-ignore
            .set('Authorization', `Basic ${btoa(environment.bauth)}`)
      })
    }

    return next.handle(authReq).pipe(
        tap(
            (event) => {
            },
            (err) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status == 401)
                  console.log('Unauthorized')
              }
            }
        )
    )
  }
}
