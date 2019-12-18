import {Observable} from 'rxjs';
import {User} from '../models/user';

export abstract class UsersRepository {
  abstract find(id: string): Observable<User>;

  abstract all(): Observable<User[]>;

  abstract update(id: string): Observable<User>;

  abstract delete(id: string): Observable<User>;
}
