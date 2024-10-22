
import { Component, OnInit, Input } from '@angular/core';
import { authors, Author} from '../model/authors.model';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {

  authors = authors;
  currentAuthor = authors[0];

  constructor() { }

  ngOnInit(): void {
  }

  // handleDelete(author: Author) {
  //   this.authors = this.authors.filter((item) => item.id !== author.id);
  // }

  //  ở parent component có thể listen vào event trên và tương tác được với nó.
  // lang nghe su kien select (emit tu author-detail)

    
  onSelected(selectAuthor: Author) {
    this.currentAuthor = selectAuthor;
  }

  onDeleted(id: number){
    this.authors = this.authors.filter(author => {
      return author.id !== id;
    });

    if (this.currentAuthor.id === id) {
      this.currentAuthor = this.authors[0];
    }
  }



}
