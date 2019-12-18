import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Book} from '../../models/book';
import {BookRepository} from '../../services/book.repository';

@Component({
  selector: 'ngu-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private bookService: BookRepository
  ) {
    this.bookForm = this.formBuilder.group({
      title: '',
      author: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(data: Book) {
    if (this.isFormComplete(data)) {
      this.bookService.add(data)
        .subscribe(() => {
          this.bookForm.reset();
          this.openSnackBar('Le livre a été ajouté');
        });
    }
  }

  private isFormComplete(data: Book) {
    return data && (data.title && data.author);
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Super!', {
      duration: 5000,
    });
  }

}
