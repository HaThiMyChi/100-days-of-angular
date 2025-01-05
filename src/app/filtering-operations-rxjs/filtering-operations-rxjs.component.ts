import { Component, OnInit } from '@angular/core';
import {from, of, interval, timer} from 'rxjs'
import { filter, find, first, last, single, take, takeUntil, skip, distinct, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-filtering-operations-rxjs',
  templateUrl: './filtering-operations-rxjs.component.html',
  styleUrls: ['./filtering-operations-rxjs.component.scss']
})
export class FilteringOperationsRxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const items = [1,2, 3, 4, 5, 6];

    const greaterThan7 = items.find(x => x > 7);
    console.log(greaterThan7);

    const observer = {
      next: (value:any)  => console.log(value),
      error: (err:any) => console.log(err),
      complete: () => console.log('complete'),
    };

    // filter 
    from(items).pipe(
      filter(x => x % 2 === 0)
    );

    //first lay item dau tien
    from(items).pipe(
      first(x => x > 4)
    )

    // neu khong truyen gi o trong of thi no tra ra error: no elements in sequence
    of().pipe(
      first()
    )

    // last lay item cuoi cung
    from(items).pipe(last(x => x > 5)).subscribe(observer) //gia su vi du x > 6 no khong co thi se bao loi

    // find() sẽ emit giá trị đầu tiên mà thoả mãn được điều kiện từ predicate rồi complete. Khác với first(), find() phải có predicate và find() sẽ không emit Error nếu như không có giá trị nào thoả mãn điều kiện
    // find()bat buoc no se truyen vo function, neu khong thoa dieu kien thi no tra undefined
    from(items).pipe(find(x => x %2 !== 0)).subscribe(observer);

    // single() chi dung khi ban can emit 1 element thoi con nhieu hon no se bao loi
    from(items).pipe(
      single(x => x > 4) // se bao loi (Sequence contains more than one element) vi no emit ra lon hon 1 element co gia tri 5, 6
    ).subscribe(observer);

     // take(), cu moi giay no chay mot lan
    interval(1000).pipe(
      take(10) // no muon lay 10 gia tri thoi xong roi complete
    ).subscribe(observer);

    // takeUntil() nhận vào 1 tham số là 1 Observable như là 1 notifier (người báo hiệu) và takeUntil() sẽ emit giá trị của Observable gốc CHO TỚI KHI notifier emit
    interval(1000).pipe(
      takeUntil(timer(5000))
    ).subscribe(observer)

    // skip() hoạt động tương tự như take() nhưng mang tính chất ngược lại so với take(). Như take() là mình sẽ emit n giá trị ban đầu, còn skip() là mình sẽ bỏ qua n giá trị ban đầu.
    from([1, 2, 3, 4])
    .pipe(skip(1))
    .subscribe(console.log, null, () => console.log('complete')); // output: 2, 3, 4 --> complete

    // distinct() distinct() sẽ so sánh các giá trị được emit từ Observable và chỉ emit các giá trị chưa được emit qua
    from([1, 2, 3, 4, 5, 5, 4, 3, 6, 1])
      .pipe(distinct())
      .subscribe(console.log, null, () => console.log('complete')); // output: 1, 2, 3, 4, 5, 6 -> complete

      
    //distinctUntilChanged() có concept tương tự distinct() nhưng khác ở chỗ distinctUntilChanged() chỉ so sánh giá trị sắp được emit với giá trị vừa được emit (giá trị cuối) chứ không so sánh với tất cả giá trị đã được emit.
    from([1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4])
      .pipe(distinctUntilChanged())
      .subscribe(console.log, null, () => console.log('complete')); // output: 1, 2, 1, 2, 3, 4 -> complete

    of(
      { age: 4, name: 'Foo' },
      { age: 6, name: 'Foo' },
      { age: 7, name: 'Bar' },
      { age: 5, name: 'Foo' }
    )
      .pipe(distinctUntilChanged((a, b) => a.name === b.name))
      .subscribe(console.log, null, () => console.log('complete')); // output: { age: 4, name: 'Foo' }, { age: 7, name: 'Bar' }, { age: 5, name: 'Foo' } -> complete
      
  }
 
}
