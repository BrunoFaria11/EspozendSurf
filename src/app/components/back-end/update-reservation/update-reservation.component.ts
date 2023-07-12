import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/core/services/app-service';
import { EmailService } from 'src/core/services/email-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.scss'],
})
export class UpdateReservationComponent {
  @Input() item: any;
  @Input() activeId!: number;

  responseModal: any;
  minDate: string = this.formatDate(new Date());
  time: string = 'morning';
  hours: string[] = [];
  isBtnDisabled: boolean = false;

  angForm = new FormGroup({
    date: new FormControl(''),
    confirmed: new FormControl(''),
  });

  constructor(
    public appService: AppService,
    public emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.time = this.item.time;
    this.hours =
      this.item.time == 'morning'
        ? ['08:00', '09:00', '10:00', '11:00', '12:00']
        : ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  }

  onSubmit(event: any) {
    this.isBtnDisabled = true;
    let model: any = {};
    this.item.classDate = event.target.date.value;
    if (!this.item.confirmed) {
      this.item.confirmed = event.target.confirmed.value;
    }
    this.item.hour = event.target.hour.value;
    model.id = this.activeId;
    this.item.time = this.time;

    model.value = JSON.stringify(this.item);

    this.appService.updateModel(model).subscribe((response: any) => {
      if (!response.succeeded) {
        this.responseModal = {
          showResponse: true,
          isError: true,
          title: 'Erro',
          text: 'Erro ao editar a aula/aluguer',
        };
        this.isBtnDisabled = false;
      }
      if (response.succeeded) {
        if (this.item?.email.length > 4) {
          let email = environment.confirmationEmail;
          email = email.replace('#text', 'A sua aula foi agendada.');
          email = email.replace('#Date', this.item.classDate);
          email = email.replace('#Date_eng', this.item.classDate);
          email = email.replace('#Hour', this.item.hour);
          email = email.replace('#Hour_eng', this.item.hour);
          email = email.replace(
            '#Time',
            this.item.time == 'morning' ? 'Manhã' : 'Tarde'
          );
          email = email.replace('#text_eng', 'Your class has been scheduled');
          email = email.replace(
            '#Time_eng',
            this.item.time == 'morning' ? 'Morning' : 'Afternoon'
          );

          this.emailService
            .sendEmail(
              'Apúlia Surf School',
              environment.fromEmail,
              this.item.email,
              email
            )
            .subscribe((response: any) => {
              if (!response.succeeded) {
                this.responseModal = {
                  showResponse: true,
                  isError: true,
                  title: 'Erro',
                  text: 'Erro ao enviar o email',
                  left: 110,
                };
                this.isBtnDisabled = false;
              }
              if (response.succeeded) {
                this.responseModal = {
                  showResponse: true,
                  isError: false,
                  title: 'Sucesso',
                  text: 'Aula editada com sucesso',
                  left: 110,
                };
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }
            });
        } else {
          this.responseModal = {
            showResponse: true,
            isError: false,
            title: 'Sucesso',
            text: 'Aula editada com sucesso',
            left: 110,
          };
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      }
    });
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

  changeTime(e: any) {
    this.time = e.target.value;
    this.hours =
      this.time == 'morning'
        ? ['08:00', '09:00', '10:00', '11:00', '12:00']
        : ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  }
}
