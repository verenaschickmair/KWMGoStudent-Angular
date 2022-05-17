import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SubjectListService} from "../shared/subject-list.service";
import {Subject} from "../shared/subject";
import {SubjectFactoryService} from "../shared/subject-factory.service";
import {OfferListService} from "../shared/offer-list.service";
import {Offer} from "../shared/offer";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit {

  subject : Subject = SubjectFactoryService.empty();
  offers? : Offer[];

  constructor(private route : ActivatedRoute,
              private ss: SubjectListService,
              private os: OfferListService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.ss.getSingle(params['id']).subscribe(s => {
      this.subject = s;
      console.log(s);
      this.os.getAllBySubjectId(this.subject.id).subscribe(o => {this.offers = o; console.log(o)});
    });
  }
}
