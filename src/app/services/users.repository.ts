import { User } from './../models/user';
import {Observable} from 'rxjs';

export abstract class UsersRepository {
  abstract find(id: string): Observable<User>;

  abstract findByMail(mail: string): Observable<User>;

  abstract add(user: User): Observable<User>;

  abstract all(): Observable<User[]>;

  abstract update(id: string): Observable<User>;

  abstract delete(id: string): Observable<User>;
}
