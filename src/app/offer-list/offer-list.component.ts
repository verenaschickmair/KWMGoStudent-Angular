import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../shared/offer";
import {OfferListService} from "../shared/offer-list.service";
import {AuthenticationService} from "../shared/authentication.service";
import {AppointmentService} from "../shared/appointment.service";
import {Router} from "@angular/router";
import {Subject} from "../shared/subject";
import {User} from "../shared/user";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {

  @Input() subject? : Subject;
  @Input() user? : User;
  loopOffers? : Offer[];
  loginUser? : User;

  constructor(private os : OfferListService,
              private authService : AuthenticationService,
              private as : AppointmentService,
              private router: Router,
              private us: UserService) {
  }

  ngOnInit(): void {
    if(this.isLoggedIn())
      this.us.getSingle(this.authService.getCurrentUserId()).subscribe((loginUser) => {
        this.loginUser = loginUser;
        this.loadOffers();
    });
    this.loadOffers();
  }

  isCurrentUserTeacher() : boolean{
    if(this.loginUser)
      return this.us.isCurrentUserTeacher(this.loginUser);
    return false;
  }

  loadOffers(){
    if(this.subject){
      this.os.getAllBySubjectId(this.subject.id).subscribe((offers) => {
        this.loopOffers = offers;
      });
    }
    else if(this.user) {
      this.os.getAllByUserId(this.user.id).subscribe((offers) => {
        this.loopOffers = offers;
      });
    }
    else{
      this.os.getAll().subscribe((offers) => {
        this.loopOffers = offers;
      });
    }
  }

  navigate(){
    this.router.navigateByUrl("new-offer");
  }

  isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

}
