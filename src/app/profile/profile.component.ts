import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../shared/user.service";
import {User} from "../shared/user";
import {UserFactoryService} from "../shared/user-factory.service";
import {OfferListService} from "../shared/offer-list.service";
import {Appointment} from "../shared/appointment";
import {Offer} from "../shared/offer";
import {Comment} from "../shared/comment";
import {AppointmentService} from "../shared/appointment.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : User = UserFactoryService.empty();
  offers? : Offer[] = [];
  comments? : Comment[] = [];
  bookings? : Appointment[] = [];
  finished = false;

  constructor(private authService : AuthenticationService,
              private router : Router,
              private us : UserService,
              private os  : OfferListService,
              private as : AppointmentService) { }

  ngOnInit(): void {
    this.us.getSingle(this.authService.getCurrentUserId()).subscribe((u) => {
      this.user = u;
      if(this.isCurrentUserSearcher())
        this.getBookings();
      else this.getComments();
    });
  }

  getComments(): void{
    this.comments = [];
    this.os.getAllByUserId(this.user.id).subscribe((offers) => {
      this.offers = offers;
      this.renderComments();
    })
  }

  getBookings(): void{
    this.bookings = [];
    this.as.getAllByUserId(this.user.id).subscribe((bookings) => {
      this.bookings = bookings;
      this.renderBookings();
    })
  }

  renderComments() : void{
    this.offers?.forEach((offer)=>{
      offer.comments?.forEach((comment) =>{
        this.comments?.push(comment);
      })
    })
    this.finished = true;
  }

   renderBookings() : void{
    let bookings : Appointment[] = [];
    this.bookings?.forEach((booking)=>{
        this.os.getSingle(booking.offer_id).subscribe((offer) => {
          this.us.getSingle(offer.user_id).subscribe((owner)=> {
            booking.owner_firstname = owner.firstname;
            booking.owner_lastname = owner.lastname;
            booking.name = offer.name;
            bookings.push(booking);
          })
        })
      });
     this.bookings = bookings;
     console.log(this.bookings)
     this.finished = true;
   }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  isCurrentUserSearcher() : boolean{
    return this.user.status === 0;
  }

  logout() : void{
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }



}
