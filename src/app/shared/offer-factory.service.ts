import { Injectable } from '@angular/core';
import {Offer} from "./offer";

@Injectable({
  providedIn: 'root'
})
export class OfferFactoryService {

  static empty() : Offer {
    return new Offer(0,'','',0, 0, []);
  }

  static fromObject (rawOffer: any) : Offer {
    return new Offer(
      rawOffer.id,
      rawOffer.name,
      rawOffer.description,
      rawOffer.user_id,
      rawOffer.subject_id,
      rawOffer.appointments
    );
  }


}
