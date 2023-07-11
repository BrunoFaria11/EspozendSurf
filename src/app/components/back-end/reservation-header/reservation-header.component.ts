import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reservation-header',
  templateUrl: './reservation-header.component.html',
  styleUrls: ['./reservation-header.component.scss']
})
export class ReservationHeaderComponent {
  @Input() item: any;
}
