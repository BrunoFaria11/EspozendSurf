import { Component } from '@angular/core';
import { AppService } from 'src/core/services/app-service';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.scss']
})
export class MailBoxComponent {

  emails:any[] = [];

  constructor(public appService: AppService) {
    this.appService.getModel('emails').subscribe((response: any) => {
      response.data.forEach(element => {
        const model = JSON.parse(element.value);
        this.emails.push(model);
      });
    })
  }
}
