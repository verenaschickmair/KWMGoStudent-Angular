import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app.routing";
import { OfferListComponent } from './offer-list/offer-list.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OfferListComponent,
    LoginComponent,
    ProfileComponent,
    OfferDetailComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
