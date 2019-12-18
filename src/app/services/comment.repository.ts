import {Observable} from 'rxjs';
import {Comment} from '../models/comment';

export abstract class CommentRepository {
  abstract add(book: Comment): Observable<Comment>;

  abstract all(): Observable<Comment[]>;

  abstract byId(id: string): Observable<Comment[]>;
}
