import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observer, of, ReplaySubject, Subject, timer, interval } from 'rxjs';
import { finalize, switchMapTo, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-day026-rxjs-subject-multicast',
  templateUrl: './day026-rxjs-subject-multicast.component.html',
  styleUrls: ['./day026-rxjs-subject-multicast.component.scss']
})
export class Day026RxjsSubjectMulticastComponent implements OnInit, OnDestroy {

  constructor() { }

  private stop$ = new Subject<void>();
  public values: number[] = [];

  ngOnInit(): void {
    // Do Subject vừa là một Observable (chúng ta có thể subscribe vào nó), vừa là một Observer (có các method để chúng ta tự control khi nào gửi notification)
    // Subject nó có thể truyền dữ liệu trong stream chính nó được nên có thể viết private được để hạn chế quyền truy xuất biến subject này
    // Subject.next là bắn ra dữ liệu

    const createObserver = (name: string): Observer<any> => ({
      next: (val: any) => console.log(name, val),
      error: (err: any) => console.log(name, err),
      complete: () => console.log(name, 'complete'),
    });

    const subject = new Subject<any>();
    subject.subscribe(createObserver('A'));
    // subject.next('hello');
    // subject.next('world 1111');

    // BehaviorSubject, nó là biến thế có khái niệm về "the current value". BehaviorSubject lưu trữ lại giá trị mới emit gần nhất để khi một Observer mới subscribe vào, nó sẽ emit giá trị đó ngay lập tức cho Observer vừa rồi (nghĩa là nó chỉ lưu trữ được data emit lần cuối cùng thôi).
    // Lưu ý: BehaviorSubject yêu cầu phải có giá trị khởi tạo khi tạo ra subject.

    const loadingSubject = new Subject();

    function getUsers() {
      loadingSubject.next(true);
      return timer(3000).pipe(
        switchMapTo(of("users")),
        finalize(() => {
          loadingSubject.next(false);
        })
      );
    }

    loadingSubject.subscribe(createObserver("Component"));

    getUsers().subscribe();


    // BehaviorSubject() nó đồng bộ chứ ko có bất đồng bộ 
    const behaviorSubject = new BehaviorSubject("hello");

    behaviorSubject.subscribe(createObserver('A'));
    behaviorSubject.next('world');
    behaviorSubject.subscribe(createObserver('B'));
    console.log(behaviorSubject.value); // behaviorSubject nó lưu được giá trị cuối cùng emit dc

    // ReplaySubject() nó lưu trữ được data đã emit (chứ ko phải giá trị cuối cùng ko thôi)

    // mình tuyền vào cái tham số mà mình muốn nhận lại cái mình mong muốn
    const replaySubject = new ReplaySubject(1); // neu minh truyen 1 thi no chi nhan 1 gia tri emit ra thoi, con gia su truyen 2 thi no nhan 2 gia tri emit
    replaySubject.subscribe(createObserver('test A'));
    replaySubject.next('hello');
    replaySubject.next('world');

    replaySubject.subscribe(createObserver('test B')); // do cho replaySubject chi truong co 1 nen no chi nhan dc gia tri test B world, neu truyen 2 thi no nhan dc test B hello, test B world

    // AsyncSubject
    // Đây là biến thể mà chỉ emit giá trị cuối cùng của Observable execution cho các observers, và chỉ khi execution complete.

    const asynSubject = new AsyncSubject();

    asynSubject.subscribe({
    next: (v) => console.log('observerA: ' + v),
    complete: () => console.log('observerA: done'),
    });

    asynSubject.next(1);
    asynSubject.next(2);
    asynSubject.next(3);
    asynSubject.next(4);
    asynSubject.next(5);

    asynSubject.complete();

    asynSubject.subscribe({
    next: (v) => console.log('observerB: ' + v),
    complete: () => console.log('observerB: done'),
  });
  /**
  Output:

  observerA: 5
  observerA: done
  observerB: 5
  observerB: done
  */

  // Tạo một Observable phát ra các giá trị mỗi giây
  interval(1000).pipe(
    takeUntil(this.stop$)
  ).subscribe({
    next: (val) => {
      this.values.push(val);
      console.log(`Value: ${val}`);
    },
    complete: () => {
      console.log('Completed');
    }
  });

  }

  stopTimer() {
    // Phát ra giá trị để dừng Observable
    this.stop$.next();
    this.stop$.complete();
  }

  ngOnDestroy() {
    // Đảm bảo rằng Observable được dừng khi component bị hủy
    this.stop$.next();
    this.stop$.complete();
  }

}
