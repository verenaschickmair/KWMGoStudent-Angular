import { Injectable } from '@angular/core';
import {catchError, Observable, retry, throwError} from "rxjs";
import {Offer} from "./offer";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OfferListService {

  constructor(private http : HttpClient) { }

  private api = 'http://api.kwmgostudent.s1910456028.student.kwmhgb.at/api';

  getAll(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/offers`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllBySubjectId($subjectId : number): Observable<Array<Offer>>{
    return this.http.get<Array<Offer>>(`${this.api}/subjects/${$subjectId}/offers`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.api}/offers/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/offers/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm:string) : Observable<Array<Offer>> {
    return this.http.get<Offer>(`${this.api}/offers/search/${searchTerm}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(offer: Offer) : Observable<any> {
    return this.http.put(`${this.api}/offers/${offer.id}`, offer).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(offer: Offer) : Observable<any> {
    return this.http.post(`${this.api}/offers`, offer).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  check(id: number) : Observable<Boolean>{
    return this.http.get<Boolean>(`${this.api}/offers/checkid/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(() => new Error(error));
  }

}
