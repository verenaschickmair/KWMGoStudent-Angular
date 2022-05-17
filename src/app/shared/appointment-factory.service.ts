import { Injectable } from '@angular/core';
import {Appointment} from "./appointment";


@Injectable({
  providedIn: 'root'
})
export class AppointmentFactoryService {

  constructor() { }

  static empty() : Appointment {
    return new Appointment(0, new Date(),{hours: 0, minutes: 0},{hours: 0, minutes: 0}, 0, 0);
  }

  static fromObject (rawAppointment: any) : Appointment {
    return new Appointment(
      rawAppointment.id,
      rawAppointment.date,
      rawAppointment.time_from,
      rawAppointment.time_to,
      rawAppointment.offer_id,
      rawAppointment.user_id
    );
  }
}
