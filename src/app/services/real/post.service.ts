import { Comment } from './../../models/comment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Post} from '../../models/post';
import {PostRepository} from '../post.repository';
import { CommentService } from './comment.service';

@Injectable()
export class PostService implements PostRepository {
  private url: string = environment.api + '/posts';
  private commentUrl: string = environment.api + '/comments';
  constructor(private http: HttpClient) { }

  add(post: Post): Observable<Post> {
    console.log(this.url);
    return this.http.post<Post>(this.url, post);
  }

  all(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  byId(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  getPostComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentUrl}/${id}`);
  }
}
