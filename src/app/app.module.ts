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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { CommentComponent } from './comment/comment.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import { OfferListItemComponent } from './offer-list-item/offer-list-item.component';
import { BookingsTableComponent } from './bookings-table/bookings-table.component';

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
    OfferFormComponent,
    OfferListItemComponent,
    BookingsTableComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [AuthenticationService,
    {
      provide:HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
