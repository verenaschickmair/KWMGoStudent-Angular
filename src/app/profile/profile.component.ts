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
  bookings ? : Appointment[] = [];
  finished = false;

  constructor(private authService : AuthenticationService,
              private router : Router,
              private us : UserService,
              private os  : OfferListService,
              private as : AppointmentService) { }

  ngOnInit(): void {
    this.us.getSingle(this.authService.getCurrentUserId()).subscribe((user) => {
      this.user = user;
      if(!this.isCurrentUserTeacher(user))
        this.getBookings();
      else {
        this.getBookings();
        this.getComments();
      }
    });
  }

  isCurrentUserTeacher(user: User){
    return this.us.isCurrentUserTeacher(user);
  }

  getComments(): void{
    this.comments = [];
    this.os.getAllByUserId(this.user.id).subscribe((offers) => {
      this.offers = offers;
      this.renderComments();
    })
  }

  renderComments() : void{
    this.offers?.forEach((offer)=>{
      offer.comments?.forEach((comment) =>{
        if(comment.user_id != this.user.id) {
          comment.offer_name = offer.name;
          this.comments?.push(comment);
        }
      })
    })
    this.finished = true;
  }

  getBookings(): void{
    this.bookings = [];
    if(!this.isCurrentUserTeacher(this.user)) {
      this.as.getAllByUserId(this.user.id).subscribe((bookings) => {
        this.bookings = bookings;
        this.renderBookings();
      });
    }
    else{
      this.os.getAllByUserId(this.user.id).subscribe((offers) => {
        console.log(offers)
        this.offers = offers;
        this.renderBookings();
      });
    }
  }

   renderBookings() : void {
     let bookings: Appointment[] = [];

     if (!this.isCurrentUserTeacher(this.user)) {
       this.bookings?.forEach((booking) => {
         this.os.getSingle(booking.offer_id).subscribe((offer) => {
           this.us.getSingle(offer.user_id).subscribe((owner) => {
             booking.owner_firstname = owner.firstname;
             booking.owner_lastname = owner.lastname;
             booking.name = offer.name;
             bookings.push(booking);
           });
         });
       });
     } else {
       this.offers?.forEach((offer) => {
         offer.appointments.forEach((booking) => {
           if (booking.user_id) {
             this.us.getSingle(booking.user_id).subscribe((user) => {
               booking.booker_firstname = user.firstname;
               booking.booker_lastname = user.lastname;
               booking.name = offer.name;
               bookings.push(booking);
             });
           }
         })
       });
     }
     this.bookings = bookings;
     this.finished = true;
   }

   isFutureAppointment(date : any){
    return new Date(date).getTime() >= new Date().getTime();
   }

   navigate(id : any){
    this.router.navigateByUrl(`offers/${id}`);
   }

   cancelAppointment(appointment : Appointment){
    this.as.cancel(appointment).subscribe((appointment) => {
      if(confirm("Willst du diese Buchung wirklich stornieren?")) {
        new Notification("Buchung erfolgreich storniert!");
        this.getBookings();
      }
    })
   }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  logout() : void{
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }



}
