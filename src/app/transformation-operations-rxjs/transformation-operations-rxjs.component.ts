import { Component, OnInit } from '@angular/core';
import { observable, Observable, of, merge, fromEvent, from, interval, BehaviorSubject} from 'rxjs';
import {map, delay, pluck, mapTo, reduce, toArray, buffer, bufferTime, scan} from 'rxjs/operators';

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
    postCount: 5,
  },
  {
    id: '34784716-019b-4868-86cd-02287e49c2d3',
    username: 'nartc',
    firstname: 'chau',
    lastname: 'tran',
    postCount: 22,
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

    // pluck
    const params$ = of({id: 123})
    const id$ = params$.pipe(pluck('id')).subscribe(observer);


    // mapTo nó sẽ đợi đến khi source complete rồi thì nó mới emit một giá trị cuối cùng và gửi đi complete
    merge(
      fromEvent(document, 'mouseenter').pipe(mapTo(true)),
      fromEvent(document, 'mouseleave').pipe(mapTo(false))
    ).subscribe(observer)

    const totalCount$ = merge(
      of(users[0]).pipe(delay(2000)),
      of(users[1]).pipe(delay(4000)),
    ).pipe(reduce((acc, cur) => acc + cur.postCount, 0))

    //toArray cung giong nhu reduce no complete thi moi chay
    const users$ = merge(
      of(users[0]).pipe(delay(2000)),
      of(users[1]).pipe(delay(4000))
    ).pipe(toArray())

    // buffer
    const source$ = interval(1000);
    const click$ = fromEvent(document, 'click');
    source$.pipe(buffer(click$))

    // bufferTime dung thoi gian de bao hieu cho buffer biet no emit value
    source$.pipe(bufferTime(2000))

    // scan mỗi lần stream emit một value, bạn muốn apply một function lên value đó nhưng có sử dụng kèm theo kết quả lưu trữ trước đó (accumulator).
    const initState$ = {};
    const stateSubject = new BehaviorSubject(initState$);
    
    const state$ = stateSubject
      .asObservable()
      .pipe(scan((state, partState) => ({...state, ...partState}), {}));
    state$.subscribe(observer);
    
    stateSubject.next({name: 'Chau'});
    stateSubject.next({age: 18});


  }

  

 


}
