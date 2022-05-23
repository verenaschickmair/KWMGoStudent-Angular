import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs";
// import {ToastrService} from "ngx-toastr";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    // private toastr: ToastrService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //
        }
      },
      (err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401) {
            // this.toastr.error("Incorrect username or password", "Login error");
            new Notification("Inkorrekter Username oder Passwort");
          }
        }
      }));
  }
}
