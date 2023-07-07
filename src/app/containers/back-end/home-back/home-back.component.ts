import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home-back',
  templateUrl: './home-back.component.html',
  styleUrls: ['./home-back.component.scss'],
})
export class HomeBackComponent {
  myScriptElement: HTMLScriptElement | undefined;
  isDashboard: boolean = true;
  isCalendar: boolean = false;

  constructor(private auth: AuthService) {
    const scripts = [
      '../../../assets/back-end/jsonform/main.js',
      '../../../assets/back-end/vendor/js/helpers.js',
      '../../../assets/back-end/js/config.js',
      '../../../assets/back-end/vendor/libs/jquery/jquery.js',
      '../../../assets/back-end/vendor/libs/popper/popper.js',
      '../../../assets/back-end/vendor/js/bootstrap.js',
      '../../../assets/back-end/vendor/libs/perfect-scrollbar/perfect-scrollbar.js',
      '../../../assets/back-end/vendor/js/menu.js',
      '../../../assets/back-end/vendor/libs/apex-charts/apexcharts.js',
      '../../../assets/back-end/js/main.js',
      '../../../assets/back-end/js/dashboards-analytics.js',
    ];
    scripts.forEach((element) => {
      this.myScriptElement = document.createElement('script');
      this.myScriptElement.src = element;
      document.body.appendChild(this.myScriptElement);
    });
  }

  nav(menu: string) {
    switch (menu) {
      case 'dashboard':
        this.isDashboard = true;
        this.isCalendar = false;
        break;
      case 'calendar':
          this.isDashboard = false;
          this.isCalendar = true;
          break;
      default:
        break;
    }
  }

  logOut(){
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }
  ngOnInit(): void {
  }
}
