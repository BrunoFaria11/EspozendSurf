import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {


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
