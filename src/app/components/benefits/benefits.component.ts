import { Component, OnInit } from '@angular/core';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

  constructor(public languageStoreService: LanguageStoreService) { }

  ngOnInit(): void {
  }

}
