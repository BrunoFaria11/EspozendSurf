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

  angForm = new FormGroup({
    date: new FormControl(''),
    confirmed: new FormControl(''),
  });

  minDate: string = this.formatDate(new Date());

  constructor(
    public appService: AppService,
    private modal: NgbModal,
    public emailService: EmailService
  ) {
    this.getReservations();
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
    debugger;
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(event: any) {
    let model: any = {};
    this.item.classDate = event.target.date.value;
    this.item.confirmed = true;
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
            }
            if (response.succeeded) {
              if (this.item?.email.length > 4) {
                let email = environment.confirmationEmail;
                email = email.replace('#text', 'A sua aula número ' + this.item.count + ' do pack foi agendada.');
                email = email.replace('#Date', this.item.classDate);
                email = email.replace('#Date_eng', this.item.classDate);
                email = email.replace('#Time', this.item.time == 'morning' ? 'Manhã' : 'Tarde');
                email = email.replace('#text_eng', 'Your class number ' + this.item.count +' of the pack has been scheduled');
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
                    }
                    if (response.succeeded) {
                      this.responseModal = {
                        showResponse: true,
                        isError: false,
                        title: 'Sucesso',
                        text: 'Aula marcada com sucesso',
                      };
                      setTimeout(() => {
                        this.modal.dismissAll();
                        this.getReservations();
                      }, 3000);
                    }
                  });
              } else {
                this.responseModal = {
                  showResponse: true,
                  isError: false,
                  title: 'Sucesso',
                  text: 'Aula marcada com sucesso',
                };
                setTimeout(() => {
                  this.modal.dismissAll();
                  this.getReservations();
                }, 3000);
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
}
