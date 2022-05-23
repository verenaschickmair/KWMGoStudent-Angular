import {UserService} from "../shared/user.service";
import {Offer} from "../shared/offer";
import {User} from "../shared/user";
import {Comment} from "../shared/comment";
import {OfferListService} from "../shared/offer-list.service";
import {OfferFactoryService} from "../shared/offer-factory.service";
import {UserFactoryService} from "../shared/user-factory.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Appointment} from "../shared/appointment";
import {AppointmentService} from "../shared/appointment.service";
import {CommentService} from "../shared/comment.service";
import {AuthenticationService} from "../shared/authentication.service";
import {Location} from '@angular/common';
import {CommentFactoryService} from "../shared/comment-factory.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentFormErrorMessages} from "./offer-detail-error-messages";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css'],
})
export class OfferDetailComponent implements OnInit {

  offer : Offer = OfferFactoryService.empty();
  user: User = UserFactoryService.empty();
  appointments: Appointment[] = [];
  comments?: Comment[] = [];
  commentForm : FormGroup;
  errors: {  [key: string]: string } = {};


  constructor(private os: OfferListService,
              private us: UserService,
              private as: AppointmentService,
              private cs: CommentService,
              private authService : AuthenticationService,
              private route : ActivatedRoute,
              private location : Location,
              private fb : FormBuilder,
              private router : Router){
    this.commentForm = this.fb.group({});
  }

  public ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.os.getSingle(params['id']).subscribe((o) => {
      this.offer = o;
      this.us.getSingle(this.offer.user_id).subscribe(u => this.user = u);
      this.renderComments();
    });
    this.commentForm = this.fb.group({
      id: new FormControl(0),
      description: new FormControl("", Validators.required)
    });
    //CHECKING FOR ERRORS
    this.commentForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    )
  }

  renderComments(){
    this.cs.getAllByOfferId(this.offer.id).subscribe(c => {
      this.comments = c;
    })
  }

  updateErrorMessages() {
    this.errors = {};

    for (const message of CommentFormErrorMessages) {
      const control = this.commentForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  public addComment(): void{
    this.updateErrorMessages();
    const comment: Comment = CommentFactoryService.fromObject(this.commentForm.value);
    comment.user_id = this.authService.getCurrentUserId();
    comment.offer_id = this.offer.id;

    this.cs.create(comment).subscribe((c) => {
      new Notification("Kommentar erfolgreich verfasst!");
      this.renderComments();
    })
  }

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  public isCurrentUserOwner(): boolean{
    return this.authService.getCurrentUserId() === this.user.id;
  }

  public deleteOffer(offer: Offer){
    if(confirm("Willst du dieses Angebot wirklich löschen?"))
      this.os.remove(offer.id).subscribe((del) => {
        new Notification("Erfolgreich gelöscht");
        this.stepBack();
      })
  }

  public stepBack(): void{
    this.location.back();
  }

}
