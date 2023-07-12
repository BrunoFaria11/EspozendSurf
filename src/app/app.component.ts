import { Component } from '@angular/core';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Espozende Surf';

  constructor(private languageStoreService: LanguageStoreService) {}

  // Shows and hides the loading spinner during RouterEvent changes
  ngOnInit() {
    const websiteLang = localStorage.getItem('websiteLang');

    if (websiteLang == undefined) {
      this.languageStoreService.change('pt');
    } else {
      this.languageStoreService.change(websiteLang);
    }
  }
}
