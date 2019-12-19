import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user';
import {UsersRepository} from '../users.repository';

@Injectable()

export class UsersService implements UsersRepository {
  private url: string = environment.api + '/users';

  constructor(private http: HttpClient) { }

  find(id: string): Observable<User> {
    return this.http.post<User>(this.url, id);
  }
  // oui encore
  findByMail(mail: string): Observable<User> {
    console.log(this.url + '/mail/' + mail.replace('@', '%40'));
    mail = mail.replace('@', '%40')
    return this.http.get<User>(`${this.url}/mail/${mail}`);
  }

  all(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  update(id: string): Observable<User> {
    return this.http.post<User>(this.url, id);
  }

  add(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
  delete(id: string): Observable<User> {
    return this.http.post<User>(this.url, id);
  }
}
