import { Component, OnInit } from '@angular/core';
import {SubjectListService} from "../shared/subject-list.service";
import {Subject} from "../shared/subject";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subjects : Subject[] = [];

  constructor(private ss : SubjectListService) { }

  ngOnInit(): void {
    this.ss.getAll().subscribe(res => this.subjects = res);
    console.log(this.subjects);
  }

}
