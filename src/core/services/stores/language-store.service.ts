import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import data from "../../../environments/siteconfig.json";

@Injectable({ providedIn: 'root' })
export class LanguageStoreService {
  constructor() { }


  _texts = new BehaviorSubject<any>([]);
  texts$ = this._texts.asObservable();


  get Texts(): any {
    return this._texts.getValue();
  }

  set Texts(val: any) {
    this._texts.next(val);
  }

  change(language: string) {
    if(language == "pt"){
      this.Texts = data.pt;
    }
    else if(language == "eng"){
      this.Texts = data.eng;
    }
  }
}
