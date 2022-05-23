import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {Router} from "@angular/router";

interface Response {
  access_token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authService : AuthenticationService, private router : Router) { }
  @ViewChild('username') username!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  ngOnInit(): void {
  }

  login(event : Event){
    event.preventDefault();
    if (this.username.nativeElement.value != "" && this.password.nativeElement.value != "") {
      console.log(this.username.nativeElement.value, this.password.nativeElement.value)
      this.authService.login(this.username.nativeElement.value, this.password.nativeElement.value).subscribe((
        res: any) => {
        this.authService.setSessionStorage((res as Response).access_token);
        this.router.navigateByUrl(`profile/${this.authService.getCurrentUserId()}`);
      });
    }
    else{
      alert("Bitte Benutzername und Passwort eingeben!")
    }
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }
}
