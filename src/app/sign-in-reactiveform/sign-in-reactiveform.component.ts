import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from '../validatiors/no-whitespace.validatior';

@Component({
  selector: 'app-sign-in-reactiveform',
  templateUrl: './sign-in-reactiveform.component.html',
  styleUrls: ['./sign-in-reactiveform.component.scss']
})
export class SignInReactiveformComponent implements OnInit {
  // signInForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  //   rememberMe: new FormControl(false),
  // });

  // Để binding giữa form model và template lại với nhau, chúng ta sẽ dùng directive [formGroup]
  // <form class="sign-in-form" [formGroup]="signInForm"></form>
  // Để binding các FormControl vào các form control như textbox, checkbox chúng ta sẽ dùng một directive đó là formControlName. Đầu vào của nó sẽ là key mà chúng ta khai báo control trong FromGroup gần nhất

  // FormBuilder để các bạn có thể khởi tạo form nhanh hơn.

  // cach 2 dung formbuilder
  // Để sử dụng formbuilder này, bạn chỉ cần inject vào constructor là được.
  signInForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Các bạn để ý là Validators.require chỉ check là input có value thì validator này sẽ trả về null, tức là control đã valid. Nếu bạn thử điền chỉ toàn dấu cách thì control này cũng sẽ được pass Validators.require.

    // Như ví dụ ở trên thì sau khi mình điền đủ 6 kí tự khoảng trắng, thì Validators.required và Validators.minLength đã pass. Nhưng vì có Validators.pattern nên control vẫn invalid. Ví dụ bây giờ username sẽ cho phép điền toàn bộ kí tự. Để minh họa thì mình sẽ tạm bỏ Validators.pattern(/^[a-z]{6,32}$/i) đi nhé.
    this.signInForm = this.fb.group({
      username: [
        '', 
        Validators.compose([
          // Validators.required, 
          NoWhitespaceValidator(),
          Validators.minLength(6), 
          // Validators.pattern(/^[a-z]{6,32}$/i) // neu bo cai nay thi dung custom validator co ten la NoWhitespaceValidator
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/)
        ]),
      ] ,
      rememberMe: false
    });

    // nếu muốn cập nhật một phần của form thì hãy dùng patchValue, nếu bạn muốn set lại tất cả và đảm bảo không cái nào bị thiếu thì dùng setValue để tận dụng báo lỗi của nó
    // ngoài ra còn có phương thức reset dể bạn rest lại tráng thái lúc khởi tạo của form hoặc control
    setTimeout(() => {
      // fake api call then update form value
      this.signInForm.patchValue({
        username: 'TiepPhan'
      });
    }, 1000);
  }

  onSubmit(): void {
    console.log(this.signInForm)
  }

  

}
