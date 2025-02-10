import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-observables',
  templateUrl: './hello-observables.component.html',
  styleUrls: ['./hello-observables.component.scss']
})
export class HelloObservablesComponent implements OnInit {
  @Input() name?: string;
  constructor() { }

  ngOnInit(): void {
  }

}
