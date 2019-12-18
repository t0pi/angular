import {Observable} from 'rxjs';
import {Book} from '../models/book';

export abstract class BookRepository {
  abstract add(book: Book): Observable<Book>;

  abstract all(): Observable<Book[]>;

  abstract byId(id: string): Observable<Book>;
}
