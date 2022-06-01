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
  owner: User = UserFactoryService.empty();
  user: User = UserFactoryService.empty();
  appointments: Appointment[] = [];
  comments?: Comment[] = [];
  commentForm : FormGroup;
  finished = false;
  date? : string;
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
    this.loadData()

    this.commentForm = this.fb.group({
      id: new FormControl(0),
      description: new FormControl("", [Validators.required, Validators.minLength(10)])
    });
    //CHECKING FOR ERRORS
    this.commentForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    )
  }

  loadData(){
    const params = this.route.snapshot.params;
    this.os.getSingle(params['id']).subscribe((o) => {
      this.offer = o;
      if(this.offer.created_at)
        this.date = new Date(this.offer.created_at).toLocaleDateString("de-DE");
      this.us.getSingle(this.offer.user_id).subscribe(owner => {
        this.owner = owner;
        this.hideBookedOrPastAppointments();
        this.renderComments();
        this.checkLoggedInUser();
      });
    });
  }

  checkLoggedInUser() : void{
    if(this.isLoggedIn()) {
      this.us.getSingle(this.authService.getCurrentUserId()).subscribe(user => {
        this.user = user;
        this.finished = true;
      });
    }
    this.finished = true;
  }

  hideBookedOrPastAppointments() : void{
    this.appointments = [];
    for(const app of this.offer.appointments){
      if(!app.user_id && new Date(app.date).getTime() >= new Date().getTime()){
        this.appointments.push(app);
      }
    }
  }

  renderComments(){
    this.cs.getAllByOfferId(this.offer.id).subscribe(c => {
      this.comments = c;
    })
  }

  navigate(){
    this.router.navigateByUrl("edit-offer/" + this.offer.id)
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

  public bookAppointment(appointment : Appointment): void{
    if(confirm('Termin verbindlich buchen?')) {
      appointment.user_id = this.authService.getCurrentUserId();
      this.as.book(appointment).subscribe((as) => {
        new Notification("Termin erolgreich gebucht!");
        this.loadData();
      });
    }
  }

  public deleteAppointment(appointment : Appointment) : void{
    this.as.remove(appointment).subscribe((as) => {
      new Notification("Termin erolgreich gelöscht!");
      this.loadData();
    })
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
    return this.authService.getCurrentUserId() === this.owner.id;
  }

  public isCurrentUserSearcher() : boolean{
    return this.user.status === 0;
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
