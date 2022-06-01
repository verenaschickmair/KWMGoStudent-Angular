import { Injectable } from '@angular/core';
import {catchError, Observable, retry, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Subject} from "./subject";

@Injectable({
  providedIn: 'root'
})
export class SubjectListService {

  constructor(private http : HttpClient) { }

  private api = 'http://api.kwmgostudent.s1910456028.student.kwmhgb.at/api';

  getAll(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(`${this.api}/subjects`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.api}/subjects/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/subjects/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(subject: Subject) : Observable<any> {
    return this.http.put(`${this.api}/subjects/${subject.id}`, subject).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(subject: Subject) : Observable<any> {
    return this.http.post(`${this.api}/subjects`, subject).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(() => new Error(error));
  }

}
