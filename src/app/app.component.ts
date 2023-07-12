import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';

// declare function do_(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Espozende Surf';

  constructor(
    private router: Router,
    private languageStoreService: LanguageStoreService
  ) {
    // do_();
  }

  ngOnInit() {
    const websiteLang = localStorage.getItem('websiteLang');

    if (websiteLang == undefined) {
      this.languageStoreService.change('pt');
    } else {
      this.languageStoreService.change(websiteLang);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // setTimeout(() => {
        //   do_();
        // }, 500);
      }
    });
  }

}
