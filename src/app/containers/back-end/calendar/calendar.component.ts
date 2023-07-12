import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { left } from '@popperjs/core';
import { AppService } from 'src/core/services/app-service';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';

@Component({
  selector: 'app-calendar-back',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarBackComponent {
  angForm!: FormGroup;
  time: string = 'morning';
  responseModal: any;
  hours: string[] = [];

  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    private modal: NgbModal,
    public languageStoreService: LanguageStoreService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.hours = ['08:00', '09:00', '10:00', '11:00', '12:00'];
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', [Validators.email]],
      classDate: ['', Validators.required],
      time: ['morning'],
    });
  }

  onClickSubmit(data: any) {
    if (
      data.name != '' &&
      data.phone != '' &&
      data.classDate != '' &&
      data.type != ''
    ) {
      let model = this.angForm.value;
      model.confirmed = true;
      let _type = JSON.parse(model.type);
      let isPack = _type.isPack;
      model.type = _type.type + ' - ' + '1';
      model.time = this.time;
      if (isPack) {
        model.max = _type.max;
        model.count = _type.max;
        this.addPack(model);
      } else {
        this.addRequest(model);
      }
    }
  }

  addRequest(model: any) {
    this.appService
      .addModel('reservation', JSON.stringify(model))
      .subscribe((response: any) => {
        if (!response.succeeded) {
          this.responseModal = {
            showResponse: true,
            isError: true,
            title: 'Erro',
            text: 'Erro ao inserir a aula/aluguer',
            left: 70,
          };
        }
        if (response.succeeded) {
          this.responseModal = {
            showResponse: true,
            isError: false,
            title: 'Sucesso',
            text: 'Aula marcada com sucesso',
            left: 70,
          };
          setTimeout(() => {
            window.location.reload();
            this.modal.dismissAll();
          }, 3000);
        }
      });
  }

  addPack(model: any) {
    model.count = 1;
    this.appService
      .addModel('reservation-pack', JSON.stringify(model))
      .subscribe((response: any) => {
        if (!response.succeeded) {
          this.responseModal = {
            showResponse: true,
            isError: true,
            title: 'Erro',
            text: 'Erro ao inserir o pack',
          };
        }
        if (response.succeeded) {
          this.addRequest(model);
        }
      });
  }

  changeTime(e: any) {
    this.time = e.target.value;
    this.hours = this.time  == 'morning' ? ["08:00","09:00","10:00","11:00","12:00"] : ["13:00","14:00","15:00","16:00","17:00","18:00","19:00"]
  }

  openModal(content) {
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  convertJSON(data: any) {
    return JSON.stringify(data);
  }
}
