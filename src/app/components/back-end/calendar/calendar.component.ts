import { AppService } from 'src/core/services/app-service';
import { Component } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  myScriptElement: HTMLScriptElement | undefined;
  array: any = [];
  item: any;
  activeId!: number;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  closeResult = '';

  minDate: string = this.formatDate(new Date());

  angForm = new FormGroup({
    date: new FormControl(''),
    confirmed: new FormControl(''),
  });

  constructor(public appService: AppService, private modal: NgbModal) {
    this.getReservations();
  }

  getReservations() {
    this.appService.getModel('reservations').subscribe((response: any) => {
      var x = response.data.sort((a, b) => {
        return JSON.parse(a.value).time <= JSON.parse(b.value).time ? 1 : -1;
      });
      x.forEach((element: any) => {
        var model = JSON.parse(element.value);
        model.id = element.id;
        this.array.push(model);
        let startDate = new Date(model.classDate);
        if (model.time == 'morning') {
          startDate.setHours(0);
        } else {
          startDate.setHours(13);
        }

        let endDate = new Date(model.classDate);

        if (model.time == 'morning') {
          endDate.setHours(13);
        } else {
          endDate.setHours(23);
        }

        let item = {
          id: element.id,
          start: startDate,
          end: endDate,
          title:
            model.name +
            ' - ' +
            (model.time == 'morning'
              ? model.type + ' - Manhã'
              : model.type + ' - Tarde'),
          color: model.confirmed
            ? model.time == 'morning'
              ? { ...colors.blue }
              : { ...colors.yellow }
            : { ...colors.red },
          allDay: false,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: false,
        };
        this.events.push(item);
      });

      var date = new Date();
      this.dayClicked({ date: date, events: this.events });
      this.dayClicked({ date: date, events: this.events });
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  open(content, e: any) {
    this.item = this.array.filter((x) => x.id == e.event.id)[0];
    this.activeId = e.event.id;
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate() + 1),
    ].join('-');
  }

  onSubmit(event: any) {
    let model: any = {};
    this.item.classDate = event.target.date.value;
    this.item.confirmed = event.target.confirmed.value;
    model.id = this.activeId;
    model.value = JSON.stringify(this.item);
    this.appService.updateModel(model).subscribe((response) => {
      this.activeDayIsOpen = false;
      this.array = [];
      this.events = [];
      this.getReservations();
    });
  }

  ngOnInit(): void {}
}
