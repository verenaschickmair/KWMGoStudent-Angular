import { Injectable } from '@angular/core';
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserFactoryService {

  constructor() { }
  static empty() : User {
    return new User(0,'','','', '', '', '', 1, 0,'',0);
  }
}
