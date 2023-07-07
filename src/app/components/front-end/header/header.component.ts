import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  value: string = 'pt';
  selectImage: string = '../../../assets/images_site/flags/pt.png';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public languageStoreService: LanguageStoreService
  ) {}

  changeLanguage(language: string) {
    this.value = language.charAt(0) + language.slice(1);
    if (this.value == 'eng') {
      this.selectImage = '../../../assets/images_site/flags/gb-eng.png';
    } else {
      this.selectImage = '../../../assets/images_site/flags/pt.png';
    }
    this.languageStoreService.change(this.value);

    window.location.reload()

  }

  ngOnInit(): void {
    const websiteLang = localStorage.getItem('websiteLang');

    if (websiteLang == undefined) {
      this.selectImage = '../../../assets/images_site/flags/pt.png';
    } else {
      if (websiteLang == 'eng') {
        this.selectImage = '../../../assets/images_site/flags/gb-eng.png';
      } else {
        this.selectImage = '../../../assets/images_site/flags/pt.png';
      }
    }
  }
}
