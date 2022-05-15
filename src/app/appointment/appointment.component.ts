import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from "../shared/appointment";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  @Input() appointment! : Appointment;

  constructor() { }

  ngOnInit(): void {
  }

}
