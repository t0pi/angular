import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Post} from '../../models/post';
import {PostRepository} from '../post.repository';

@Injectable()
export class PostService implements PostRepository {
  private url: string = environment.api + '/posts';

  constructor(private http: HttpClient) { }

  add(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post);
  }

  all(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  byId(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
  }
}
