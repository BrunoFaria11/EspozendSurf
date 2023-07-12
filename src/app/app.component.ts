import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  ParamMap,
  Router,
  RouterEvent,
} from '@angular/router';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Espozende Surf';

  public showOverlay = true;

  constructor(
    private router: Router,
    private languageStoreService: LanguageStoreService
  ) {
   
  }

  // Shows and hides the loading spinner during RouterEvent changes
  ngOnInit() {
    const websiteLang = localStorage.getItem('websiteLang');

    if (websiteLang == undefined) {
      this.languageStoreService.change('pt');
    } else {
      this.languageStoreService.change(websiteLang);
    }
    if (!localStorage.getItem('reload')) {
      localStorage.setItem('reload', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('reload');
      this.showOverlay = false;
    }
  }
}
