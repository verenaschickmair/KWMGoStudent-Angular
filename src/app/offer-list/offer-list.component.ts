import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../shared/offer";
import {OfferListService} from "../shared/offer-list.service";
import {AuthenticationService} from "../shared/authentication.service";
import {AppointmentService} from "../shared/appointment.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {

  @Input() offers! : Offer[];

  constructor(private os : OfferListService,
              private authService : AuthenticationService,
              private as : AppointmentService,
              private router: Router) {
  }

  ngOnInit(): void {
  }


  public isCurrentUserOwner(id : number): boolean{
    return this.authService.getCurrentUserId() === id;
  }

  // public getAppointments(id: number) : void{
  //   this.as.getAllByOfferId(id).subscribe((a) => {
  //     this.appointments = a
  // });
  // }

  public isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

  public deleteOffer(offer: Offer){
    if(confirm("Willst du dieses Angebot wirklich löschen?"))
      this.os.remove(offer.id).subscribe((del) => {
        new Notification("Erfolgreich gelöscht");
      })
  }
}
