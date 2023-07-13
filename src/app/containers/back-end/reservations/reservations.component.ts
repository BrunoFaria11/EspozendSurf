import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/core/services/app-service';
import { EmailService } from 'src/core/services/email-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent {
  array: any[] = [];
  item: any;
  responseModal: any;
  hours: string[] = [];
  time: string = 'morning';
  isBtnDisabled: boolean = false;
  minDate: string = this.formatDate(new Date());

  angForm = new FormGroup({
    date: new FormControl(''),
    confirmed: new FormControl(''),
  });

  constructor(
    public appService: AppService,
    private modal: NgbModal,
    public emailService: EmailService
  ) {
    this.getReservations();
  }

  ngOnInit() {
    this.time = this.item?.time;
    this.hours =
      this.item?.time == 'morning'
        ? ['08:00', '09:00', '10:00', '11:00', '12:00']
        : ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  }

  getReservations() {
    this.appService.getModel('reservation-pack').subscribe((response: any) => {
      var x = response.data.sort((a, b) => {
        return JSON.parse(a.value).classDate <= JSON.parse(b.value).classDate
          ? 1
          : -1;
      });

      x.forEach((element: any) => {
        var model = JSON.parse(element.value);
        model.id = element.id;
        model.creationDate = this.formatDate(new Date(element.creationDate));

        this.array.push(model);
      });
    });
  }

  openRequest(content, id: number) {
    this.item = this.array.filter((x) => x.id == id)[0];
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(event: any) {
    this.isBtnDisabled = true;
    let model: any = {};
    this.item.classDate = event.target.date.value;
    this.item.confirmed = true;
    this.item.time = this.time;
    model.id = this.item.id;
    this.item.count = this.item.count + 1;

    const modelToUpdate = JSON.stringify(this.item);
    model.value = modelToUpdate;
    this.appService.updateModel(model).subscribe((response: any) => {
      if (response.succeeded) {
        this.array = [];
        this.item.type = this.item.type + ' - ' + this.item.count;
        this.item.time = event.target.time.value;
        const modelToInsert = JSON.stringify(this.item);
        this.appService
          .addModel('reservation', modelToInsert)
          .subscribe((response: any) => {
            if (!response.succeeded) {
              this.responseModal = {
                showResponse: true,
                isError: true,
                title: 'Erro',
                text: 'Erro ao inserir a aula/aluguer',
              };
              this.isBtnDisabled = false;
            }
            if (response.succeeded) {
              if (this.item?.email.length > 4) {
                let email = environment.confirmationEmail;
                email = email.replace('#text', this.item.type + ' foi agendada.');
                email = email.replace('#Date', this.item.classDate);
                email = email.replace('#Date_eng', this.item.classDate);
                email = email.replace('#Hour', this.item.hour);
                email = email.replace('#Hour_eng', this.item.hour);
                email = email.replace('#Time', this.item.time == 'morning' ? 'Manhã' : 'Tarde');
                email = email.replace('#text_eng', this.item.type + ' has been scheduled');
                email = email.replace('#Time_eng', this.item.time == 'morning' ? 'Morning' : 'Afternoon');

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
                      };
                      this.isBtnDisabled = false;
                    }
                    if (response.succeeded) {
                      this.responseModal = {
                        showResponse: true,
                        isError: false,
                        title: 'Sucesso',
                        text: 'Aula marcada com sucesso',
                      };
                      this.isBtnDisabled = false;
                      this.modal.dismissAll();
                      this.getReservations();
                    }
                  });
              } else {
                this.responseModal = {
                  showResponse: true,
                  isError: false,
                  title: 'Sucesso',
                  text: 'Aula marcada com sucesso',
                };
                this.isBtnDisabled = false;
                this.modal.dismissAll();
                this.getReservations();
              }
            }
          });
      } else {
        this.responseModal = {
          showResponse: true,
          isError: true,
          title: 'Erro',
          text: 'Erro ao editar o pack',
        };
        this.isBtnDisabled = false;
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
