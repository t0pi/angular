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
  //post: Observable<Comment[]>;

  constructor(
    private postService: PostRepository,
    //private commentService: CommentRepository
  ) { }

  ngOnInit() {
    this.feed = this.postService.all();
    const v = this.feed;
    v.subscribe({
      next(value){
        for(let i = 0; i< value.length;i++)
        {
          console.log(value[i].id)
        }
      }
    });

    console.log(v);
    var arr = [];
    var request: any = {};
    v.forEach((v) => arr.push(v));

    for(let i = 0;i < arr.length;i++)
    {
      request.id = arr[i].id;
      // bli;
      //commentsByPosts.push(arr[i].id);
      //p.id = arr[i].id;
      //commentsByPosts.push(p);
    }
    console.log(request);
    // console.log(commentsByPosts);
    //this.post = this.commentService.all();
  }
}
