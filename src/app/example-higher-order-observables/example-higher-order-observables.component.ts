import { Component, OnInit, VERSION } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../types';
import { UserService } from '../user.service';
import { debounceTime, startWith, tap, map, switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-example-higher-order-observables',
  templateUrl: './example-higher-order-observables.component.html',
  styleUrls: ['./example-higher-order-observables.component.scss']
})
export class ExampleHigherOrderObservablesComponent implements OnInit {
  name = "Angular " + VERSION.major;
  queryControl = new FormControl("");
  users: User[] = [];
  loading = true;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {

    this.queryControl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.loading = true;
        }),
        startWith("") ,// value changes nó chỉ emit khi mình bắt đầu type (có nghĩa là nhập vào input) vào đây nhưng mình muốn dùng để nó chạy ngay lập tức khi mới thiết lập ở stream này
      
        // cach 2:
        map(query => this.userService.getUsers(query).pipe(
          tap(() => {
            this.loading = false;
          })
        )),
        switchAll()

        // cach 3 dung theo switchMap = switchAll + map
      )
      // Cach 1
      // .subscribe(query => {
      //   this.userService.getUsers(query).pipe(
      //     tap(() => {
      //       this.loading = false;
      //     })
      //   ).subscribe(users => {
      //     this.users = users;
      //   });
      // });
      // do nó  là observable nên mình phải subscribe 2 lần
      // cách mà muốn ko dùng subscribe bên trong subscribe thì dùng theo observables (mergeAll, switchAll, concatAll), switchAll thì sẽ cancel cái thằng đang chạy


      // Cách 2 dùng theo SwitchAll
      .subscribe(users => {
        this.users = users;
      })

      // switchMap = switchAll + map

      //  khi làm việc với Http Client trong Angular chẳng hạn, bạn chỉ nên dùng switchMap cho những task get dữ liệu, nếu bạn sử dụng cho Create, Update, Delete có thể sinh ra race condition. 
      // Lúc này các bạn nên thay thế bằng mergeMap hoặc concatMap.
  }

}
