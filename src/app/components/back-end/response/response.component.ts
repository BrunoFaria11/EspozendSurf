import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent {
  @Input() prop: any;
}
