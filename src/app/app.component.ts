import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ToggleComponent } from './toggle/toggle.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // @ViewChild ta muon tham chieu den mot child tren cai view
  // neu truyen static true thi no se resol o ngOnInit

  @ViewChild('toggleComp', {static:true}) toggleComp!: ToggleComponent;
  @ViewChild('toggleBtn', {static:true}) toggleBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('nameInput', {static: true}) nameInput!: ElementRef<HTMLInputElement>;

  // neu nhieu component hien thi toggle component thi dung viewChildren
  @ViewChildren(ToggleComponent) toggleComps!: QueryList<ToggleComponent>;

  title = 'angular100-day';

  isChecked = true;
  showLast = true;

  name = "Angular version 12";
  currentIndex = 0;
  showTab4 = true;

  questions = {
    question1: true,
    question2: false

  }

  ngOnInit() {
    setTimeout(() => {
      this.nameInput.nativeElement.focus()
    }, 3000)
   
    // console.log('onInit', this.toggleComp, this.toggleBtn);
   
  }


  ngAfterViewInit() {
    // console.log(this.toggleComp);
    this.toggleComps.changes.subscribe(console.log);
  }
}
