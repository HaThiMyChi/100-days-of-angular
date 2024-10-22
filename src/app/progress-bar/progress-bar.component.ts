import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  
  // @Input được gọi là một property decorator
  @Input() progress = 0;
  @Input() backgroundColor: string =  "";
  @Input() progressColor: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

  // ngOnChanges sẽ chạy lại mỗi khi có một input nào bị thay đổi, 
  // nó sẽ được tự động gọi bởi Angular, do đó chúng ta có thể validate property progress như sau:

  ngOnChanges(changes: SimpleChanges) {
    if (changes['progress']) {
      const change = changes['progress'];
      if (typeof change.currentValue !== 'number') {
        const progress = Number(change.currentValue);
        if (Number.isNaN(progress)) {
          this.progress = 0;
        } else {
          this.progress = progress;
        }
      } else {
        this.progress = change.currentValue;
      }
    }
  }

}
