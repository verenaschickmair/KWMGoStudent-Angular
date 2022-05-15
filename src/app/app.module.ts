import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app.routing";
import { OfferListComponent } from './offer-list/offer-list.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import {AuthenticationService} from "./shared/authentication.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { CommentComponent } from './comment/comment.component';
import { AppointmentComponent } from './appointment/appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OfferListComponent,
    LoginComponent,
    ProfileComponent,
    OfferDetailComponent,
    SubjectListComponent,
    SubjectDetailComponent,
    CommentComponent,
    AppointmentComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
