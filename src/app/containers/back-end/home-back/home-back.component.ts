import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-home-back',
  templateUrl: './home-back.component.html',
  styleUrls: ['./home-back.component.scss'],
})
export class HomeBackComponent {
  myScriptElement: HTMLScriptElement | undefined;
  menuOpned: boolean = false;
  constructor(private auth: AuthService, private router: Router) {
    const scripts = [
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

  logOut() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }

  openMenu(){
    this.menuOpned = true;
  }

  getRoute(route: string) {
    if(this.router.url.toString().includes(route)){
      return true;
    }
    else{
      return false;
    }
  }

  ngOnInit(): void {
  }
}
