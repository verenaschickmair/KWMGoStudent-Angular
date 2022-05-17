import { Component, OnInit } from '@angular/core';
import {SubjectListService} from "../shared/subject-list.service";
import {Subject} from "../shared/subject";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  subjects : Subject[] = [];

  constructor(private ss : SubjectListService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.ss.getAll().subscribe(res => this.subjects = res);
    console.log(this.subjects);
  }

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }
}
