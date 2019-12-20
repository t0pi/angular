import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Likes} from '../../models/likes';
import {LikesRepository} from '../likes.repository';

@Injectable()
export class LikesService implements LikesRepository {
  private url: string = environment.api + '/likes';

  constructor(private http: HttpClient) { }

  add(book: Likes): Observable<Likes> {
    return this.http.post<Likes>(this.url, book);
  }

  all(): Observable<Likes[]> {
    return this.http.get<Likes[]>(this.url);
  }

  byId(post: string,author: string): Observable<Likes> {
    return this.http.get<Likes>(`${this.url}/${post}/${author}`);
  }

  delete(like: Likes): Observable<Likes> {
    console.log(`${this.url}/${like}`);
    return this.http.post<Likes>(this.url, like);
  }
}
