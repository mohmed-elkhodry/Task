import { FormBuilder, FormGroup } from '@angular/forms';
import { Ioption } from './custom-chip/option.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng14_POC';
  public progeammingLanguages:Ioption[]=[
    {id:1,label:"Go"},
    {id:2,label:"Javascript"},
    {id:3,label:"Dart"},
    {id:4,label:"Python"},
    {id:5,label:"Java"},
    {id:6,label:"PHP"},
    {id:7,label:"Kotlin"},
    {id:8,label:"Swift"},
  ];
  public form!: FormGroup;
  constructor(private fb:FormBuilder){
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      programmingLanguages:[""]
    })
  }
}
