import {Appointment} from "./appointment";
import {Comment} from "./comment";

export class Offer {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public user_id: number,
    public subject_id: number,
    public appointments: Appointment[],
    public comments?: Comment[]
  ) { }
}
