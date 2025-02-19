import { AbstractControl, ValidatorFn } from "@angular/forms";

export function NoWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Lấy giá trị của control
      let controlVal = control.value;
  
      // Check xem nếu giá trị là số (vì bạn có thể dùng ở <input type="number") thì convert giá trị đó sang string.
      if (typeof controlVal === 'number') {
        controlVal = `${controlVal}`;
      }
  
      // Check độ dài của string sau khi đã trim, nếu độ dài vẫn bằng 0 thì chắc chắn input chỉ toàn dấu cách.
      const isWhitespace = (controlVal || '').trim().length === 0;
      const isValid = !isWhitespace;
  
      // Dựa vào đó và return lại errors hay null.
      return isValid ? null : { whitespace: 'Value is only whitespace' };
    };
}