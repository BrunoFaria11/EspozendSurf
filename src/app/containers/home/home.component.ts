import { Component, OnInit } from '@angular/core';
import { LanguageStoreService } from 'src/core/services/stores/language-store.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  angForm!: FormGroup;

  constructor(public languageStoreService: LanguageStoreService, private fb: FormBuilder) {
    this.createForm();
   }
   createForm() {
    this.angForm = this.fb.group({
       name: ['', Validators.required ],
       cardNumber: ['', Validators.required ],
       birthDay: ['', Validators.required ],
       email: ['', [Validators.required, Validators.email] ],
       phone:  ['', [ Validators.required,
        Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"),
        Validators.minLength(5)]] ,
       classDate: ['', Validators.required ],
       type: ['', Validators.required ],
       address: [''],
       comments: ['' ],
       time: ['morning'],
    });
  }

  ngOnInit(): void {
  }

  changeTime(e: any) {
    this.angForm.value.time = e.target.value;
  }

  onClickSubmit(data: any) {
    if(data.name != '' && data.cardNumber != '' && data.birthDay != '' && data.email != '' && data.phone != '' && data.classDate != '' && data.type != '')
    {
      alert("Entered Email id : " + data);
    }
 }
}
