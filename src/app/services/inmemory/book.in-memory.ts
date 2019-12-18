import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Book} from '../../models/book';
import {BookRepository} from '../book.repository';

const library: Book[] = [
  {id: '1', title: 'Dune', author: 'Frank HERBERT'},
  {id: '2', title: 'Hyperion', author: 'Dan SIMMONS'},
  {id: '3', title: 'Fondation', author: 'Isaac ASIMOV'},
  {id: '4', title: 'La Horde du Contrevent', author: 'Alain DAMASIO'},
  {id: '5', title: 'Le Maître du Haut Château', author: 'Philip K. DICK'}
];

@Injectable()
export class BookInMemory implements BookRepository {
  private library$: Subject<Book[]> = new BehaviorSubject(library);

  add(book): Observable<Book> {
    return this.library$
      .pipe(
        map(books => {
          const id: string = (books.length + 1).toString();
          const newBook: Book = {id, ...book};
          books.push(newBook);
          return newBook;
        })
      );
  }

  all(): Observable<Book[]> {
    return this.library$;
  }

  byId(id): Observable<Book> {
    return this.library$
      .pipe(
        map(books => books.filter(book => book.id === id)[0])
      );
  }
}
