import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {Location} from '@angular/common';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {OfferListService} from "../shared/offer-list.service";
import {OfferFactoryService} from "../shared/offer-factory.service";
import { OfferFormErrorMessages } from './offer-form-error-messages';
import {Offer} from "../shared/offer";
import {SubjectListService} from "../shared/subject-list.service";
import {Subject} from "../shared/subject";
import {OfferValidators} from "../shared/offer-validators";


@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {

  constructor(private authService : AuthenticationService,
              private location: Location,
              private fb: FormBuilder,
              private os: OfferListService,
              private ss: SubjectListService,
              private route: ActivatedRoute) {
    this.offerForm = this.fb.group({});
    this.appointments = this.fb.array([]);
  }

  offerForm: FormGroup;
  offer = OfferFactoryService.empty();
  appointments: FormArray;
  errors: {  [key: string]: string } = {};
  isUpdatingOffer = false;
  loaded = false;
  subjects? : Subject[];
  selectedSubject? : number;

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.ss.getAll().subscribe((subjects) => {
      this.subjects = subjects;
      this.selectedSubject = subjects[0].id;
    })

    //UPDATE OFFER
    if (id) {
      this.isUpdatingOffer = true;
      this.os.getSingle(id).subscribe(offer => {
        this.offer = offer;
        this.initOffer();
        this.loaded = true;
      });
    }
    //NEW OFFER
    else{
      this.initOffer();
      this.loaded = true;
    }
  }

  initOffer() {
    //SHOW EXISTING APPOINTMENTS FOR UPDATE
    this.buildAppointmentArray();

    //CREATE OFFER FORM
    this.offerForm = this.fb.group({
      id: this.offer.id,
      name: [this.offer.name, [Validators.required, Validators.minLength(3)]],
      description: [this.offer.description, [Validators.minLength(10), Validators.maxLength(1000)]],
      subject_id: this.selectedSubject,
      appointments: this.appointments
    });

    //CHECKING FOR ERRORS
    this.offerForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    )
  }

  buildAppointmentArray() {
    if (this.offer.appointments && this.offer.appointments.length) {
      this.appointments = new FormArray([]);
      for (let appointment of this.offer.appointments) {
        let fg = this.fb.group({
          'id': new FormControl(appointment.id),
          'date': new FormControl(appointment.date, [Validators.required, OfferValidators.dateFormat(new Date())]),
          'time_from': new FormControl(appointment.time_from, [Validators.required]),
          'time_to': new FormControl(appointment.time_to, [Validators.required])
        });
        this.appointments.push(fg);
      }
    }
    else{
      this.addAppointmentControl();
    }
  }

  //ADD EMPTY APPOINTMENT
  addAppointmentControl() {
    this.appointments.push(this.fb.group(
      {
        'id': new FormControl(0),
        'date': new FormControl("", [Validators.required, OfferValidators.dateFormat(new Date())]),
        'time_from': new FormControl("", Validators.required),
        'time_to': new FormControl("", Validators.required)
      }
    ));
  }

  updateErrorMessages() {
    this.errors = {};

    for (const message of OfferFormErrorMessages) {
      const control = this.offerForm.get(message.forControl);
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

  onChange(select: any): void {
    let s = select.target;
    this.selectedSubject = s[s.selectedIndex].id;
  }

  submitForm() {
    const offer: Offer = OfferFactoryService.fromObject(this.offerForm.value);
    offer.user_id = this.authService.getCurrentUserId();
    offer.subject_id = this.selectedSubject!;

    if (this.isUpdatingOffer) {
      this.os.update(offer).subscribe(res => {
        new Notification("Erfolgreich aktualisiert!")
        this.stepBack();
      });
    } else {
      this.os.create(offer).subscribe(res => {
        this.offer = OfferFactoryService.empty();
        this.offerForm.reset(OfferFactoryService.empty());
        this.stepBack();
      });
    }
  }

  public isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

  public stepBack() : void{
    this.location.back();
  }
}
