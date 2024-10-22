import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day018-pipes',
  templateUrl: './day018-pipes.component.html',
  styleUrls: ['./day018-pipes.component.scss']
})
export class Day018PipesComponent implements OnInit {
  currentDate = new Date();
  user = {
    name: 'chau',
    age: 18
  }

  addr = {
    address1: '1xxxx',
    address2: '2xxx',
    city: '123x',
    state: 'State',
    zip: '18',
    country: 'VN'
  }

  users = [
    {
      name: "Tiep Phan",
      age: 30
    },
    {
      name: "Trung Vo",
      age: 28
    },
    {
      name: "Chau Tran",
      age: 29
    },
    {
      name: "Tuan Anh",
      age: 16
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  AddUser() {
    // this.users = [...this.users, {name: 'axxxx', age:30}];
    // neu dung pure is false thi dung cach push nhu nay
    this.users.push({name: 'fffff', age: 42})
  }

}
