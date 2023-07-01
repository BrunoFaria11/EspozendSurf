import { Component } from '@angular/core';

declare function doT_(): any;

@Component({
  selector: 'app-build-form',
  templateUrl: './build-form.component.html',
  styleUrls: ['./build-form.component.scss']
})

export class BuildFormComponent {
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      doT_();
    }, 1000);
  }
}
