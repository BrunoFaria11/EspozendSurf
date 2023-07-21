import { Component, OnInit } from '@angular/core';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';

declare function loadMap(markers): any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor(public languageStoreService: LanguageStoreService) {}

  ngOnInit(): void {
    loadMap(this.languageStoreService.Texts.section6.countries);
  }
}
