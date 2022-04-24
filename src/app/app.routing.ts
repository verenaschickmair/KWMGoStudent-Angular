import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {OfferListComponent} from "./offer-list/offer-list.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {OfferDetailComponent} from "./offer-detail/offer-detail.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'offers', component: OfferListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'offer-detail', component: OfferDetailComponent },
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []

})

export class AppRoutingModule { }
