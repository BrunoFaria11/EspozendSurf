import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

  constructor(
    public languageStoreService: LanguageStoreService,
  ) {}

  ngOnInit(): void {}

}
