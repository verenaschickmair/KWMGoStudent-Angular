import { Injectable } from '@angular/core';
import {Subject} from "./subject";

@Injectable({
  providedIn: 'root'
})
export class SubjectFactoryService {

  constructor() { }

  static empty() : Subject {
    return new Subject(0,'','','');
  }

  static fromObject (rawSubject: any) : Subject {
    return new Subject(
      rawSubject.id,
      rawSubject.lva,
      rawSubject.name,
      rawSubject.description,
    );
  }

}
