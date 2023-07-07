import { Component, Input, OnInit } from '@angular/core';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  
  icons = {
    faChevronRight_: faChevronRight,
    faChevronLeft_: faChevronLeft,
  }

  owlOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['&#8249', '&#8250;'],
    items: 3,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      767: {
        items: 2
      },
      1024: {
        items: 2
      }
    },
    nav: false
  }

  constructor(public languageStoreService: LanguageStoreService) { }

  ngOnInit(): void {
  }

}
