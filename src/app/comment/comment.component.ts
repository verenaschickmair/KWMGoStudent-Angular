import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../shared/comment";
import {User} from "../shared/user";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment! : Comment;
  user? : User;

  constructor(private us : UserService) { }

  ngOnInit(): void {
    this.us.getSingle(this.comment.user_id).subscribe((u) => this.user = u);
  }

}
