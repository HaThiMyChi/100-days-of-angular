import { Component, Input, OnInit, Output } from '@angular/core';
import { Author } from '../model/authors.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {
  @Input() author!: Author;  // Sử dụng dấu chấm than để đảm bảo author sẽ được khởi tạo


  @Output() select = new EventEmitter<Author>();
  @Output() delete = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }

  // handleDelete() {
  //   this.deleteAuthor.emit(this.author);
  // }

}
