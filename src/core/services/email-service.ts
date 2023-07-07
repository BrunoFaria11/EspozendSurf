import { HttpClient } from '@angular/common/http';
import { Email } from '../models/email';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(subject: string,fromEmail: string, body: string) {
    let email = new Email(
      environment.fromEmail,
      fromEmail,
      subject,
      fromEmail,
      environment.toEmail,
      'surf',
      body
    );
    return this.http.post(environment.cm + '/api/Email', email);
  }
}
