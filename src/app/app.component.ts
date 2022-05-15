import { Component } from '@angular/core';
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'studentClient';

  constructor(private authService : AuthenticationService) {
  }

  public isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

  public currentUserId() : number {
    return this.authService.getCurrentUserId();
  }
}


