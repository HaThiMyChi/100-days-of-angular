import { Component, OnInit } from '@angular/core';
import { observable, Observable, of, merge} from 'rxjs';
import {map, delay} from 'rxjs/operators';

interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
}

const users = [
  {
    id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662',
    username: 'tiepphan',
    firstname: 'tiep',
    lastname: 'phan',
  },
  {
    id: '34784716-019b-4868-86cd-02287e49c2d3',
    username: 'nartc',
    firstname: 'chau',
    lastname: 'tran',
  },
];


@Component({
  selector: 'app-transformation-operations-rxjs',
  templateUrl: './transformation-operations-rxjs.component.html',
  styleUrls: ['./transformation-operations-rxjs.component.scss']
})

export class TransformationOperationsRxjsComponent implements OnInit {
  public usersVm: any;
  constructor() { }

  ngOnInit(): void {
    this.usersVm = users.map(user => {
      return  {
        ...user,
        fullname: `${user.firstname} ${user.lastname}`
      }
    });

    const observer = {
      next: (value:any) => console.log(value),
      error: (error:any) => console.log(error),
      complete: () => console.log('completed')
    };

    /* 
    // map , dung from thi no map tung phan tu
    of(users) // outer observable parent observable
    .pipe(
      map(data => {
        console.log('insdie map', data);
        return data;
      })
    ).subscribe(observer)
    */

    merge (
      of(users[0]).pipe(delay(2000)) ,// 2s emit ra tiep phan
      of(users[1]).pipe(delay(4000)) ,// 2s emit ra chau tran (4s)
    )
    .pipe(
      map(user => ({...user, fullname: `${user.firstname} ${user.lastname}`}))
    ).subscribe(observer)
  }

  

 


}
