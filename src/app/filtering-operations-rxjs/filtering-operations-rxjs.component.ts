import { Component, OnInit } from '@angular/core';
import {from, of} from 'rxjs'
import { filter, first, last} from 'rxjs/operators';

@Component({
  selector: 'app-filtering-operations-rxjs',
  templateUrl: './filtering-operations-rxjs.component.html',
  styleUrls: ['./filtering-operations-rxjs.component.scss']
})
export class FilteringOperationsRxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const items = [1,2, 3, 4, 5, 6];

    const observer = {
      next: (value:any)  => console.log(value),
      error: (err:any) => console.log(err),
      complete: () => console.log('complete'),
    };

    // filter 
    from(items).pipe(
      filter(x => x % 2 === 0)
    ).subscribe(observer);

    //first lay item dau tien
    from(items).pipe(
      first(x => x > 4)
    ).subscribe(observer)

    // neu khong truyen gi o trong of thi no tra ra error: no elements in sequence
    of().pipe(
      first()
    ).subscribe(observer)

    // last lay item cuoi cung
    from(items).pipe(last()).subscribe(observer)
  }

}
