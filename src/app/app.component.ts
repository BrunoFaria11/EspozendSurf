import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Espozende Surf';

  constructor(
    private route: ActivatedRoute,
    private languageStoreService: LanguageStoreService
  ) {}

  ngOnInit() {
    this.languageStoreService.change("pt");
  }
}
