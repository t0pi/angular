import { CommentService } from './../../services/real/comment.service';
import { RouterModule } from '@angular/router';
import {Component, OnInit, OnChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {CommentComponent} from '../comment/comment.component';
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
  pschit: Observable<Comment[]> ;
  values: any;
  constructor(
    private postService: PostRepository,
    private commentService: CommentRepository
  ) { }

  ngOnInit() {
    this.feed = this.postService.all();
    const arr = [];
    const comms = [];
    const v = this.feed.toPromise().then(data => {
      arr.push(data);

    }).then(dt => {
      let usersstatus = [];
      let datas = {};
      for(let i = 0; i < arr[0].length; i++)
      {
        this.pschit = this.postService.getPostComments(String(arr[0][i].id));
        // console.log(this.pschit);
        this.pschit.forEach(val => {
          // tslint:disable-next-line: forin
          usersstatus.push(val);
          console.log(usersstatus);
          this.values = usersstatus;
        });

      }
      // console.log(comms);
    });
    //console.log(v);
    //console.log(this.pschit);
    // v.subscribe(value => {
    //  arr = value;
    //}
        // tslint:disable-next-line: prefer-for-of

    // );
    console.log(arr);
    // tslint:disable-next-line: prefer-for-of
  }
  // tslint:disable-next-line: use-lifecycle-interface
  getComms(id) {
    console.log(id);
    console.log(this.post);
  }

  // tslint:disable-next-line: use-lifecycle-interface
}
