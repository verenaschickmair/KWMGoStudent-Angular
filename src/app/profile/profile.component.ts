import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../shared/user.service";
import {User} from "../shared/user";
import {UserFactoryService} from "../shared/user-factory.service";
import {CommentService} from "../shared/comment.service";
import {OfferListService} from "../shared/offer-list.service";
import {Appointment} from "../shared/appointment";
import {Offer} from "../shared/offer";
import {Comment} from "../shared/comment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : User = UserFactoryService.empty();
  offers? : Offer[] = [];
  comments? : Comment[] = [];

  constructor(private authService : AuthenticationService,
              private router : Router,
              private us : UserService,
              private os  : OfferListService) { }

  ngOnInit(): void {
    this.us.getSingle(this.authService.getCurrentUserId()).subscribe((u) => {
      this.user = u;
      this.getComments();
    });
  }

  getComments(): void{
    this.comments = [];
    this.os.getAllByUserId(this.user.id).subscribe((app) => {
      this.offers = app;
      this.renderComments();
    })
  }

  renderComments() : void{
    this.offers?.forEach((offer)=>{
      offer.comments?.forEach((comment) =>{
        this.comments?.push(comment);
      })
    })
    console.log(this.comments)
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  logout() : void{
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }



}
