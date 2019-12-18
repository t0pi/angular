import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {Comment} from '../models/comment';

export abstract class PostRepository {
  abstract add(book: Post): Observable<Post>;

  abstract all(): Observable<Post[]>;

  abstract CommentsById(id: string): Observable<Comment>

  abstract byId(id: string): Observable<Post>;
}
