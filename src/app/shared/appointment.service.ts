import { Injectable } from '@angular/core';
import {catchError, Observable, retry, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Appointment} from "./appointment";
import {Comment} from "./comment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http : HttpClient) { }

  private api = 'http://api.kwmgostudent.s1910456028.student.kwmhgb.at/api';

  getAll(): Observable<Array<Appointment>> {
    return this.http.get<Array<Appointment>>(`${this.api}/appointments`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  book(appointment: Appointment) : Observable<any> {
    return this.http.put(`${this.api}/appointments/${appointment.id}`, appointment).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllByUserId(userId : number): Observable<Array<Appointment>>{
    return this.http.get<Array<Appointment>>(`${this.api}/appointments/user/${userId}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(() => new Error(error));
  }


}
