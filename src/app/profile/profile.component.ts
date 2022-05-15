import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../shared/user.service";
import {User} from "../shared/user";
import {UserFactoryService} from "../shared/user-factory.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : User = UserFactoryService.empty();

  constructor(private authService : AuthenticationService,
              private router : Router,
              private us : UserService) { }

  ngOnInit(): void {
    this.us.getSingle(this.authService.getCurrentUserId()).subscribe((u) => this.user = u);
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  logout() : void{
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }



}
