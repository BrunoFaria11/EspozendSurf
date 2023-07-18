import {  Component, OnInit } from '@angular/core';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { google } from 'googleapis';
import { AppService } from 'src/core/services/app-service';
import { environment } from 'src/environments/environment';
import { EmailService } from 'src/core/services/email-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myScriptElement: HTMLScriptElement | undefined;
  angForm!: FormGroup;
  showResponse: boolean = false;
  isError: boolean = false;
  minDate: string = this.formatDate(new Date());
  time: string = 'morning';
  isBtnDisabled: boolean = false;

  constructor(
    public languageStoreService: LanguageStoreService,
    public appService: AppService,
    private fb: FormBuilder,
    public emailService: EmailService
  ) {
    const scripts = ['../../../assets/front-end/js/main.js'];
    scripts.forEach((element) => {
      this.myScriptElement = document.createElement('script');
      this.myScriptElement.src = element;
      document.body.appendChild(this.myScriptElement);
    });
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      cardNumber: ['', Validators.required],
      birthDay: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
          ),
          Validators.minLength(5),
        ],
      ],
      classDate: ['', Validators.required],
      type: ['', Validators.required],
      address: [''],
      comments: [''],
      time: ['morning'],
    });
  }

  ngOnInit(): void {}

  changeTime(e: any) {
    this.time = e.target.value;
  }

  onClickSubmit(data: any) {
    debugger
    this.isBtnDisabled = true;
    if (
      data.name != '' &&
      data.cardNumber != '' &&
      data.birthDay != '' &&
      data.email != '' &&
      data.phone != '' &&
      data.classDate != '' &&
      data.type != ''
    ) {
      let model = this.angForm.value;
      model.confirmed = false;
      let _type = JSON.parse(model.type);
      let isPack = _type.isPack;
      model.type = _type.type;
      model.time = this.time;
      if (isPack) {
        model.max = _type.max;
        this.addPack(model);
      } else {
        this.addRequest(model);
      }
    }
  }

  onSearchChange(e: any) {
    console.log(e.target.classDate.value);
  }

  addRequest(model: any) {
    this.appService
      .addModel('reservation', JSON.stringify(model))
      .subscribe((response: any) => {
        if (!response.succeeded) {
          this.isError = true;
        }
        if (response.succeeded) {
          let email = environment.classEmail;
          email = email.replace('#name', this.angForm.value.name);
          email = email.replace('#cardNumber', this.angForm.value.cardNumber);
          email = email.replace('#birthDay', this.angForm.value.birthDay);
          email = email.replace('#email', this.angForm.value.email);
          email = email.replace('#phone', this.angForm.value.phone);
          email = email.replace('#address', this.angForm.value.address);
          email = email.replace('#classDate', this.angForm.value.classDate);
          email = email.replace('#type', this.angForm.value.type);
          email = email.replace('#time', this.angForm.value.time);
          email = email.replace('#comments', this.angForm.value.comments);

          this.emailService
            .sendEmail(
              'Site - Marcação - ' + this.angForm.value.email,
              environment.fromEmail,
              environment.toEmail,
              email
            )
            .subscribe((response: any) => {
              this.cleanInputs();
              this.showResponse = true;
              setTimeout(() => {
                window.location.reload();
                this.isBtnDisabled = false;
              }, 2000);
            });
        }
      });
  }

  addPack(model: any) {
    model.count = 0;
    this.appService
      .addModel('reservation-pack', JSON.stringify(model))
      .subscribe((response: any) => {
        if (!response.succeeded) {
          this.isError = true;
        }
        if (response.succeeded) {
          let email = environment.classEmail;
          email = email.replace('#name', this.angForm.value.name);
          email = email.replace('#cardNumber', this.angForm.value.cardNumber);
          email = email.replace('#birthDay', this.angForm.value.birthDay);
          email = email.replace('#email', this.angForm.value.email);
          email = email.replace('#phone', this.angForm.value.phone);
          email = email.replace('#address', this.angForm.value.address);
          email = email.replace('#classDate', this.angForm.value.classDate);
          email = email.replace('#type', this.angForm.value.type);
          email = email.replace('#time', this.angForm.value.time);
          email = email.replace('#comments', this.angForm.value.comments);

          this.emailService
            .sendEmail(
              'Site - Pack - ' + this.angForm.value.email,
              environment.fromEmail,
              environment.toEmail,
              email
            )
            .subscribe((response: any) => {
              this.cleanInputs();
              this.showResponse = true;
              this.isBtnDisabled = false;
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            });
        }
      });
  }

  convertJSON(data: any) {
    return JSON.stringify(data);
  }

  cleanInputs() {
    this.angForm.reset();
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
