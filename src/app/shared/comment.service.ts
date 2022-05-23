import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Comment} from "./comment";
import {Offer} from "./offer";

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

  getSingle($commentId : number): Observable<Comment>{
    return this.http.get<Comment>(`${this.api}/comments/${$commentId}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(comment: Comment) : Observable<any> {
    return this.http.post(`${this.api}/offers/${comment.offer_id}`, comment).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/comments/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(comment: Comment) : Observable<any> {
    return this.http.put(`${this.api}/comments/${comment.id}`, comment).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(() => new Error(error));
  }
}
