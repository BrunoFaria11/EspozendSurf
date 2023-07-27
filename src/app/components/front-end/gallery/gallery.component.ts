import { Component, ElementRef, OnInit } from '@angular/core';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  myScrollContainer!: HTMLElement;

  constructor(private elmRef: ElementRef,public languageStoreService: LanguageStoreService) { }

  ngOnInit(): void {
    this.myScrollContainer = this.elmRef.nativeElement.querySelector('#my-scroll-container');
  }

}
