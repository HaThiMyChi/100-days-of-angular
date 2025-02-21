import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { isObservable, Observable, Subject, timer } from 'rxjs';
import { filter, map, startWith, switchMap, take, tap } from 'rxjs/operators';

const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;

// const validateUserNameFromApi = (api: ApiService) => {
//   return (control: AbstractControl): Observable<ValidationErrors | null> => {
//     return api.validateUsername(control.value).pipe(
//       map((isValid: boolean) => {
//         return isValid ? null : { usernameDuplicated: true };
//       })
//     );
//   };
// };

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;
  formSubmit$ = new Subject<any>();

  constructor(private _fb: FormBuilder, private _api: ApiService) { }

  ngOnInit(): void {
    this.initForm();

    // Ý tưởng là thay vì ngSubmit sẽ trigger thẳng hàm submit, mình sẽ tạo ra một Subject tên là formSubmit$ và handle chỉ khi nào status của form chuyển thành VALID thì formSubmit$ mới emit một value, từ đó mới call hàm submitForm.
    // tap: toán tử này thực hiện một tác vụ phụ mà không thay đổi giá trị của luồng dữ liệu
    // this.registerForm.markAsDirty(): Đánh dấu form là đã thay đổi (dirty). Điều này có nghĩa là form đã được người dùng tương tác và thay đổi ít nhất một giá trị.
    // switchMap: toán từ này chuyển đổi luồng Observable nó nhận một Observable mới từ this.registerForm.statusChanges và hủy bỏ bất kỳ yêu cầu nào trước đó nếu có
    // Observable này phát ra các trạng thái thay đổi của form (ví dụ: "VALID", "INVALID", "PENDING"). Bạn sẽ lắng nghe các thay đổi trạng thái này để biết khi nào form hoàn thành quá trình kiểm tra.
    // take(1) toán tử này chỉ lấy một giá trị đầu tiên tù observable. sau khi nhận được trạng thái đầu tiên mà ko phải là PENDING, quá trình sẽ dừng lại và ko nhận thêm bất kỳ trạng thái nào
    // subscribe cuối cùng khi tất cả các điều kiện trên được thỏa mản (form được đánh dấu là dirty, form ko còn trạng thái pending và form hợp lệ, hàm submitform() sẽ được gọi dể gửi dữ liệu form)
    this.formSubmit$
      .pipe(
        tap(() => this.registerForm.markAsDirty()),
        switchMap(() =>
          this.registerForm.statusChanges.pipe(
            startWith(this.registerForm.status),
            filter(status => status !== "PENDING"),
            take(1)
          )
        ),
        filter(status => status === "VALID")
      )
      .subscribe(validationSuccessful => this.submitForm());
      // validationSuccessful: Đây là giá trị mà bạn nhận được từ Observable, nhưng ở đây, nó không được sử dụng trong việc xử lý tiếp theo, vì mục tiêu chính là chỉ gọi submitForm() khi form hợp lệ.
  }

  initForm() {
    this.registerForm = this._fb.group(
      {
        username: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^[a-z]{6,32}$/i)
          ]),
          this.validateUserNameFromApi(this._api),
        ],
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(PASSWORD_PATTERN)
          ])
        ],
        confirmPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(PASSWORD_PATTERN)
          ])
        ]
      },
      {
        validators: this.validateControlsValue("password", "confirmPassword")
      }
    )
  }

  // Nếu API trả về là true, thì hàm validateUserNameFromAPI  sẽ trả về null, tức là input này hoàn toàn ko có lỗi
  // còn api trả về false thì hàm validateUserNameFromAPI sẽ trả về một object với data là bất cứ gì bạn muốn
  validateUserNameFromApi = (api: ApiService) => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(300).pipe(
        switchMap(() => 
          api.validateUsername(control.value).pipe(
            map((isValid: boolean) => {
              return isValid ? null : { usernameDuplicated: true };
            })
          )
        )
      );
    };
  };

  // validate confirm pasword trùng với password thì chúng ta chỉ cần viết 1 hàm custom validator đơn giản
  validateControlsValue(firstControlName: string, secondControlName: string) {
    return function(formGroup: FormGroup) {
      const firstControl = formGroup.get(firstControlName);
      const secondControl = formGroup.get(secondControlName);
      if(!firstControl || !secondControl) {
        return null;
      }

      const {value: firstControlValue} = firstControl;
      const {value: secondControlValue} = secondControl;
      return firstControlValue === secondControlValue ? null : {valueNotMatch: {firstControlValue, secondControlValue}};
    };
  }

  submitForm() {
    console.log("Submit form leh");
  }

}
