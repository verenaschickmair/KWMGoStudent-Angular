import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Comment} from "./comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : HttpClient) { }

  private api = 'http://api.kwmgostudent.s1910456028.student.kwmhgb.at/api';

  getAll(): Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>(`${this.api}/comments`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllByOfferId($offerId : number): Observable<Array<Comment>>{
    return this.http.get<Array<Comment>>(`${this.api}/offers/${$offerId}/comments`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(() => new Error(error));
  }
}
