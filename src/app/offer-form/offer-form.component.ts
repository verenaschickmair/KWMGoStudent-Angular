import {Component, NgIterable, OnInit} from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {Location} from '@angular/common';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferListService} from "../shared/offer-list.service";
import {OfferFactoryService} from "../shared/offer-factory.service";
import {AppointmentFactoryService} from "../shared/appointment-factory.service";
import { AppointmentService } from '../shared/appointment.service';
import { OfferFormErrorMessages } from './offer-form-error-messages';
import {Offer} from "../shared/offer";


@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {

  // @ts-ignore
  constructor(private authService : AuthenticationService,
              private location: Location,
              private fb: FormBuilder,
              private os: OfferListService,
              private as: AppointmentService,
              private route: ActivatedRoute,
              private router: Router) {
    this.offerForm = this.fb.group({});
    this.appointments = this.fb.array([]);
  }

  offerForm: FormGroup;
  offer = OfferFactoryService.empty();
  appointments: FormArray;
  errors: {  [key: string]: string } = {};
  isUpdatingOffer = false;

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];

    //UPDATE OFFER
    if (id) {
      this.isUpdatingOffer = true;
      this.os.getSingle(id).subscribe(offer => {
        this.offer = offer;
        this.initOffer();
      });
    }
    //NEW OFFER
    else this.initOffer();
  }

  initOffer() {
    //SHOW EXISTING APPOINTMENTS FOR UPDATE
    this.buildAppointmentArray();
    console.log(this.appointments)

    //CREATE OFFER FORM
    this.offerForm = this.fb.group({
      id: this.offer.id,
      name: [this.offer.name, [Validators.required, Validators.minLength(3)]],
      description: [this.offer.description, [Validators.minLength(10), Validators.maxLength(1000)]],
      appointments: this.appointments
    });

    //CHECKING FOR ERRORS
    this.offerForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    )
  }

  buildAppointmentArray() {
    if (this.offer.appointments && this.offer.appointments.length) {
      this.appointments = this.fb.array([]);
      for (let appointment of this.offer.appointments) {
        let fg = this.fb.group({
          'id': new FormControl(appointment.id),
          'date': new FormControl(appointment.date, [Validators.required]),
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
        'id': this.fb.control(0),
        'date': new FormControl(["", Validators.required]),
        'time_from': new FormControl(["", Validators.required]),
        'time_to': new FormControl("", Validators.required)
      }
    ));
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.offerForm.invalid);
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

  submitForm() {
    const offer: Offer = OfferFactoryService.fromObject(this.offerForm.value);
    console.log(offer);

    if (this.isUpdatingOffer) {
      this.os.update(offer).subscribe(res => {
        this.router.navigate(['../../offers', offer.id], {
          relativeTo: this.route
        });

      });
    } else {
      offer.user_id = this.authService.getCurrentUserId();
      this.os.create(offer).subscribe(res => {
        this.offer = OfferFactoryService.empty();
        this.offerForm.reset(OfferFactoryService.empty());
        this.router.navigate(["../offers"], { relativeTo: this.route  });
      });
    }

    // todo: save offer
  }

  public isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

  public stepBack() : void{
    this.location.back();
  }
}
