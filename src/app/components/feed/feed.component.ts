import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../../models/post';
import {Comment} from '../../models/comment';
import {PostRepository} from '../../services/post.repository';
import {CommentRepository} from '../../services/comment.repository';

@Component({
  selector: 'ngu-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  feed: Observable<Post[]>;
  post: Observable<Comment[]>;

  constructor(
    private postService: PostRepository,
    //private commentService: CommentRepository
  )
  { }

  ngOnInit() {
    this.feed = this.postService.all();
    //this.post = this.commentService.all();
  }
}
