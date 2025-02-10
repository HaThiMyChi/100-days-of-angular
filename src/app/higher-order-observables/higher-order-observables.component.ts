import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, of} from 'rxjs';
import { map, mergeAll, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-higher-order-observables',
  templateUrl: './higher-order-observables.component.html',
  styleUrls: ['./higher-order-observables.component.scss']
})
export class HigherOrderObservablesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Observable<Observable>
    const hoo = interval(1000) // Outer Observable (Parent Observable)
      .pipe(map(val => of(`I am at: ${val}`))); // Inner Observable (Child Observable)

    // hoo.subscribe(obs => obs.subscribe(console.log));

    const hooObservable = fromEvent(document, 'click')
      .pipe(map(val=> interval(1000).pipe(take(5))), mergeAll());
    hooObservable.subscribe(console.log);

    //mergeAll() , giả sử khi click 1 lần thì nó sẽ có 1 observable, click 2 lần thì nó có 2 observable....
    // mergeAll có bao nhiêu observable nó sẽ chạy bấy nhiêu observable, nếu mình ko truyền vào thì nó subscribe toàn bộ

    //concatAll() nó subscribe theo thứ tự phải đảm bảo cái đầu tiên nó complete trước thì mới tới observable thứ 2 (kế tiếp)....
    //SwitchAll() nếu đang subscribe đầu tiên nếu mà có subscribe kế tiếp thì ta unsubscribe đầu tiên này, và subscribe thằng kế tiếp
    // switchMap()  luôn luôn chỉ có 1 observable subscribe tại 1 thời điểm bất kỳ thôi

    // operator map() dùng để chuyển giá trị được emit từ Source Observable sang 1 giá trị mới rồi emit giá trị mới này.

    // tap() là 1 operator mà các bạn có thể pipe vào bất cứ Observable nào và tại bất cứ vị trí nào. 
    // tap() nhận vào tham số giống như subscribe đó là Observer hoặc là 3 functions nextFunction, errorFunction, và completeFunction. Vì nhận vào tham số giống subscribe, nên bản chất tap() không trả về giá trị gì. 
    // Điều này nghĩa là tap() hoàn toàn không làm thay đổi bất cứ gì trên 1 Observable.

    interval(1000)
    .pipe(
      tap((val) => console.log('before map', val)),
      map((val) => val * 2),
      tap((val) => console.log('after map', val))
    )
    .subscribe();

// before map: 0
// after map: 0

// before map: 1
// after map: 2

// before map: 2
// after map: 4
// ...

  }


}

// delay() khá là dễ hiểu, chỉ là delay giá trị emit của 1 Observable nào đó dựa vào tham số truyền vào. 
// delayWhen() tính chất hoạt động giống như delay() nhưng thay vì truyền vào khoảng thời gian Number hoặc ngày Date, thì chúng ta truyền vào 1 function mà trả về 1 Observable. delayWhen() sẽ hoãn emit giá trị của Source Observable cho đến khi Observable truyền vào emit.

// finalize() rất đơn giản là 1 operator mà sẽ nhận vào 1 callback. callback này sẽ được thực thi khi Observable complete hoặc error. Use-case thường gặp nhất của finalize() chính là stop loader/spinner, vì chúng ta sẽ muốn cái loader/spinner dừng lại/không hiển thị khi 1 API Request thực hiện xong, cho dù có lỗi hay không có lỗi.

// this.loading = true;
// this.apiService
//   .get()
//   .pipe(finalize(() => (this.loading = false)))
//   .subscribe();

// repeat(), đúng như tên gọi, sẽ nhận vào tham số count và sẽ lặp lại Source Observable đúng với số count mà được truyền vào.

// toPromise() là 1 instance method trên class Observable dùng để chuyển đổi 1 Observable thành Promise
async function test() {
  const helloWorld = await of('hello')
    .pipe(map((val) => val + ' World'))
    .toPromise();
  console.log(helloWorld); // hello World
}
