import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  private api = 'http://api.kwmgostudent.s1910456028.student.kwmhgb.at/api';

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.api}/users`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/users/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/user/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm:string) : Observable<Array<User>> {
    return this.http.get<User>(`${this.api}/user/search/${searchTerm}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(user: User) : Observable<any> {
    return this.http.put(`${this.api}/user/${user.id}`, user).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(user: User) : Observable<any> {
    return this.http.post(`${this.api}/user`, user).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  check(id: number) : Observable<Boolean>{
    return this.http.get<Boolean>(`${this.api}/user/checkid/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(() => new Error(error));
  }

}
