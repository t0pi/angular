import {Observable} from 'rxjs';
import {Post} from '../models/post';

export abstract class PostRepository {
  abstract add(book: Post): Observable<Post>;

  abstract all(): Observable<Post[]>;

  abstract byId(id: string): Observable<Post>;
}
