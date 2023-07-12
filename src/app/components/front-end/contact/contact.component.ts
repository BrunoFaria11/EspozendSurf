import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/core/services/email-service';
import { AppService } from 'src/core/services/app-service';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  angForm!: FormGroup;
  showResponse: boolean = false;
  isError: boolean = false;
  isBtnDisabled: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    public emailService: EmailService,
    public languageStoreService: LanguageStoreService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      message: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onClickSubmit(data: any) {
    this.isBtnDisabled = true;
    if (data.name != '' && data.message != '' && data.email != '') {
      this.cleanInputs();
      this.appService
        .addModel('emails', JSON.stringify(this.angForm.value))
        .subscribe((response: any) => {
          if (!response.succeeded) {
            this.isError = true;
          }
          if (response.succeeded) {
            let email = environment.simpleEmail;
            email = email.replace('#name', data.name);
            email = email.replace('#email', data.email);
            email = email.replace('#body', data.message);
            this.emailService
              .sendEmail(
                'Site - Normal Email',
                environment.fromEmail,
                environment.toEmail,
                email
              )
              .subscribe((response: any) => {
                this.showResponse = true;
                setTimeout(() => {
                  this.showResponse = false;
                }, 2000);
                this.isBtnDisabled = true;
              });
          }
        });
    }
  }

  cleanInputs() {
    this.angForm.reset();
  }
}
