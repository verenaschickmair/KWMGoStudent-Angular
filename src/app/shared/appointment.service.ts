import { Injectable } from '@angular/core';
import {catchError, Observable, retry, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Appointment} from "./appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http : HttpClient) { }

  private api = 'http://api.kwmgostudent.s1910456028.student.kwmhgb.at/api';

  getAll(): Observable<Array<Appointment>> {
    return this.http.get<Array<Appointment>>(`${this.api}/appointments`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllByOfferId($offerId : number): Observable<Array<Appointment>>{
    return this.http.get<Array<Appointment>>(`${this.api}/offers/${$offerId}/appointments`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(() => new Error(error));
  }


}
