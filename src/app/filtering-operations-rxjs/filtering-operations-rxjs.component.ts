import { Component, OnInit } from '@angular/core';
import {from, of, interval, timer, observable, forkJoin, combineLatest, zip, concat, merge, race, } from 'rxjs'
import { filter, find, first, last, single, take, takeUntil, skip, distinct, distinctUntilChanged, delay, map, mapTo, startWith, endWith, pairwise} from 'rxjs/operators';

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

    // forkJoin() nhận vào tham số là 1 list các observables theo dạng Array hoặc Dictionary (Object) (children)
    // Khi các children Observable complete hết thì forkJoin() sẽ emit giá trị các children Observables theo dạng Array hoặc Dictionary (tùy tham số truyền vào) rồi sau đó sẽ complete
    //     forkJoin() chỉ emit khi các children Observables complete. Nếu như 1 trong số các children Observables không complete, forkJoin() sẽ không bao giờ emit.
    // forkJoin() sẽ throw error khi 1 trong các children Observables throw error, và giá trị của các children Observables đã complete khác sẽ bị nuốt mất nếu như các bạn không xử lý error hợp lý.
    forkJoin([of(1), of('hello'), of({foo: 'bar'})]).subscribe(observer);

    forkJoin({one: of(1), hello: of('hello'), foo: of({foo: 'bar'})}).subscribe(
      observer
    )
    // những giá trị mà chạy ở khoảng khác nhau á sẽ bị nuốt, ví dụ bên dưới 2s thì nó emit ra số 0 và 1 nhưng chưa complete số ) bị nuốt rồi chỉ còn số 1 thôi
    forkJoin([
      of('hello').pipe(delay(1000)),
      of('world').pipe(delay(2000)),
      interval(1000).pipe(take(2))
    ]).subscribe(observer);

    forkJoin([
      of('hello').pipe(delay(1000)),
      of('world').pipe(delay(2000)),
      interval(1000).pipe(take(2))
    ], (hello: any, world: any, inter: any) =>
      ({hello, world, inter})
    ).subscribe(observer);

    forkJoin([
      of('hello').pipe(delay(1000)),
      of('world').pipe(delay(2000)),
      interval(1000).pipe(take(2))
    ]).pipe(map(([hello, world, inter]) =>
      ({hello, world, inter}))
    ).subscribe(observer);

    //combineLatest() giống với forkJoin() là cũng sẽ nhận vào tham số là 1 Array<Observable>. 
    // Khác với forkJoin() là combineLatest() không nhận vào Dictionary (Object) và combineLatest() sẽ emit khi TẤT CẢ các children Observables emit ít nhất một lần, 
    // nghĩa là các children Observables không cần phải complete mà chỉ cần emit ít nhất 1 giá trị thì combineLatest() sẽ emit giá trị là Array gồm tất cả các giá trị được children Observables emit, theo thứ tự.
    combineLatest([
      interval(2000).pipe(map((x) => `First: ${x}`)), // {1}
      interval(1000).pipe(map((x) => `Second: ${x}`)), // {2}
      interval(3000).pipe(map((x) => `Third: ${x}`)), // {3}
    ])
    // .subscribe(observer);

    // zip() là nó gộp theo cặp
    combineLatest(of(1, 2, 3), of(4, 5, 6), of(7, 8, 9)).subscribe(observer);
    // [1, 4, 7], // cả 3 emit
    // [2, 4, 7], // obs1 emit 2, combineLatest emit giá trị 2 của obs1 và 2 giá trị cũ của obs2 và obs3
    // ...        // sau 1 loạt emit
    // [3, 6, 9]

    zip(of(1, 2, 3, 99), of(4, 5, 6), of(7, 8, 9)).subscribe(observer);
    // [1, 4, 7]; // 3 số đầu tiên ở từng observable
    // [2, 5, 8]; // 3 số tiếp theo
    // [3, 6, 9]; // 3 số cuối cùng
    // 99 của observable đầu tiên sẽ bị bỏ qua vì observable thứ 2 và thứ 3 đã complete mất rồi.

    const age$ = of<number>(29, 28, 30);
    const name$ = of<String>('Chau', 'Trung', 'Tiep');
    const isAdmin$ = of<boolean>(true, false, true);

    zip(age$, name$, isAdmin$).pipe(
      map(([age, name, isAdmin]) => ({age, name, isAdmin}))
    ).subscribe(observer)

    // concat() 
    concat(
      interval(1000).pipe(take(3)),
      interval(500).pipe(take(5))
    )
    // .subscribe(observer)

    // merge
    merge(
      interval(1000).pipe(take(3), map(x => `first ${x}`)),
      interval(500).pipe(take(5), map(x => `second ${x}`))
    )
    // .subscribe(observer)

    // race() chạy đua, thằng nào emit trước thì nó lấy trước thôi
    race(
      interval(1000).pipe(mapTo('fast')),
      interval(2000).pipe(mapTo('medium')),
      interval(3000).pipe(mapTo('slow'))
    )
    // .subscribe(observer);
    // output: fast - 1s -> fast - 1s -> fast - 1s -> fast...

    // startWith() là 1 operator rất dễ hiểu. startWith() nhận vào 1 list các tham số. startWith() sẽ làm cho cả Observable emit giá trị của startWith() trước rồi mới emit đến giá trị của Outer Observable. startWith() sẽ emit giá trị ngay lặp tức mà không phụ thuộc vào việc Outer Observable có emit hay là chưa.
    of('world').pipe(startWith('Hello12')).subscribe(observer);

    // endWith() cung nhan vao 1 list cac tham so nhu startWith() nhung cach hoat dong thi nguoc lai voi startWith().
    // mot so khac biet lon la endwith() chi emit gia tri cua endWith() khi Outer Observable complete ma thoi
    of('hi', 'how are you?', 'sorry, I have go to now')
      .pipe(endWith('goodbye'))
      .subscribe(observer)

    // pairwise() là 1 operator rất thú vị và rất kén nghiệp vụ. pairwise() sẽ gộp giá trị emit gần nhất và giá trị đang được emit của Outer Observable thành 1 Array (1 cặp giá trị) và emit Array này.
    from([1, 2, 3, 4, 5])
      .pipe(
        pairwise(),
        map(([prev, cur]) => prev + cur)
      )
      .subscribe(observer);
      // output:
      // 3 (1 + 2)
      // 5 (2 + 3)
      // 7 (3 + 4)
      // 9 (4 + 5)
  }
 
  
}
