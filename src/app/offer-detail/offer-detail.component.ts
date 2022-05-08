import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {

  offer : any;

  constructor(private location:Location){}

  public ngOnInit(): void {
    this.offer = this.location.getState();
    console.log(this.offer)
  }
}
