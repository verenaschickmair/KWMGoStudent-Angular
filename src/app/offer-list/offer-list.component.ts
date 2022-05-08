import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../shared/offer";
import {OfferListService} from "../shared/offer-list.service";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  // public offerList: Array<Map<any, any>> = [];
  // public totalPages = 1;
  // public currentPage = 2;
  offers : Offer[] = [];

  constructor(private os : OfferListService) {
  }

  ngOnInit(): void {
    this.os.getAll().subscribe(res => this.offers = res);
    console.log(this.offers);
  }

    // /* PAGINATION */
    // https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/posts?per_page=3
  //   fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/acf/v3/sb_offer?per_page=4")
  //     .then((response) => {
  //       this.paginate(response.headers.get("X-WP-TotalPages"));
  //       return response;
  //     }).then(response => response.json())
  //     .then(offers => {
  //       this.renderPosts(offers);
  //     });
  // }
  //
  // public paginate(totalPages: string | null) {
  //   if (totalPages && parseInt(totalPages) > 1)
  //     this.totalPages = parseInt(totalPages);
  // }
  //
  // public renderPagination() {
  //   fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/acf/v3/sb_offer?per_page=4&page=" + this.currentPage)
  //     .then(response => response.json())
  //     .then(posts => {
  //       this.renderPosts(posts);
  //       this.currentPage++;
  //     });
  // }
  //
  // private renderPosts(offers: any) {
  //   for (let offer of offers) {
  //     let offerMap: Map<any, any> = new Map();
  //     for (const [key, value] of Object.entries(offer.acf)) {
  //       offerMap.set(key, value);
  //     }
  //     this.offerList.push(offerMap);
  //   }
  // }
}
