import {Time} from "@angular/common";

export class Appointment {
  constructor(
    public id: number,
    public date: Date,
    public time_from: Time,
    public time_to: Time,
    public offer_id: number,
    public user_id: number,
  ) { }
}
