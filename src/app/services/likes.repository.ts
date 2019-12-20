import {Observable} from 'rxjs';
import {Likes} from '../models/likes';

export abstract class LikesRepository {
  abstract add(book: Likes): Observable<Likes>;

  abstract all(): Observable<Likes[]>;

  abstract byId(id: string, author: string): Observable<Likes>;

  abstract delete(like: Likes): Observable<Likes>;


}
