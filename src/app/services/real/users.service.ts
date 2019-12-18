import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user';
import {UsersRepository} from '../users.repository';

@Injectable()

export class UsersService implements UsersRepository{
  private url: string = environment.api + '/posts';

  constructor(private http: HttpClient) { }

  find(id: string): Observable<User> {
    return this.http.post<User>(this.url, id);
  }

  all(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  update(id: string): Observable<User> {
    return this.http.post<User>(this.url, id);
  }

  delete(id: string): Observable<User> {
    return this.http.post<User>(this.url, id);
  }
}
