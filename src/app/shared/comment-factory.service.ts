import { Injectable } from '@angular/core';
import {Comment} from "./comment";

@Injectable({
  providedIn: 'root'
})
export class CommentFactoryService {

  constructor() { }

  static empty() : Comment {
    return new Comment(0,'',0,0);
  }

  static fromObject (rawComment: any) : Comment {
    return new Comment(
      rawComment.id,
      rawComment.description,
      rawComment.offer_id,
      rawComment.user_id,
    );
  }
}
