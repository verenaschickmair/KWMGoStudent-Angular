import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {Offer} from "../shared/offer";
import {User} from "../shared/user";
import {Comment} from "../shared/comment";
import {OfferListService} from "../shared/offer-list.service";
import {OfferFactoryService} from "../shared/offer-factory.service";
import {UserFactoryService} from "../shared/user-factory.service";
import {ActivatedRoute} from "@angular/router";
import {Appointment} from "../shared/appointment";
import {AppointmentService} from "../shared/appointment.service";
import {CommentService} from "../shared/comment.service";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {

  offer : Offer = OfferFactoryService.empty();
  user: User = UserFactoryService.empty();
  comments: Comment[] = [];
  appointments: Appointment[] = [];

  constructor(private os: OfferListService,
              private us: UserService,
              private as: AppointmentService,
              private cs: CommentService,
              private route : ActivatedRoute){}

  public ngOnInit(): void {
    const params = this.route.snapshot.params;
    console.log(params)
    this.os.getSingle(params['id']).subscribe((o) => {
      this.offer = o
      this.us.getSingle(this.offer.user_id).subscribe(u => this.user = u);
      this.as.getAllByOfferId(this.offer.id).subscribe(a => this.appointments = a)
      this.cs.getAllByOfferId(this.offer.id).subscribe(c => this.comments = c)
    });
  }

  public addComment(): void{
    console.log("commented!")
  }
}
