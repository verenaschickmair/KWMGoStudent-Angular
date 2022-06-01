import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from "../shared/offer";
import {AuthenticationService} from "../shared/authentication.service";
import {OfferListService} from "../shared/offer-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../shared/user.service";
import {User} from "../shared/user";
import {UserFactoryService} from "../shared/user-factory.service";
import {Subject} from "../shared/subject";
import {SubjectListService} from "../shared/subject-list.service";

@Component({
  selector: 'app-offer-list-item',
  templateUrl: './offer-list-item.component.html',
  styleUrls: ['./offer-list-item.component.css']
})
export class OfferListItemComponent implements OnInit {

  @Input() offer! : Offer;
  @Input() subject? : Subject;
  @Output() deleteEvent = new EventEmitter();
  owner : User = UserFactoryService.empty();

  constructor(private authService : AuthenticationService,
              private os : OfferListService,
              private router : Router,
              private us : UserService,
              private ss: SubjectListService) { }

  ngOnInit(): void {
  }

  public isCurrentUserOwner(id : number): boolean{
    return this.authService.getCurrentUserId() === id;
  }

  public deleteOffer(offer: Offer){
    if(confirm("Willst du dieses Angebot wirklich löschen?"))
      this.os.remove(offer.id).subscribe((del) => {
        new Notification("Erfolgreich gelöscht");
        this.deleteEvent.emit(offer.id);
      })
  }

  navigate(id : number, param?: string){
    if(param === 'edit') this.router.navigateByUrl(`edit-offer/${id}`);
    else this.router.navigateByUrl(`offers/${id}`);
  }

}
