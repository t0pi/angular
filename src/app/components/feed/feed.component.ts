import { CommentService } from './../../services/real/comment.service';
import { RouterModule } from '@angular/router';
import {Component, OnInit, OnChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {CommentComponent} from '../comment/comment.component';
import {Post} from '../../models/post';
import {Comment} from '../../models/comment';
import {PostRepository} from '../../services/post.repository';
import {CommentRepository} from '../../services/comment.repository';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'ngu-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  feed: Observable<Post[]>;
  post: Observable<Comment[]>;
  pschit: Observable<Comment[]> ;
  commentForm: FormGroup;
  values: any;
  constructor(
    private postService: PostRepository,
    private commentService: CommentRepository,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private bookService: CommentRepository
  ) {
    this.commentForm = this.formBuilder.group({
      date: '',
      author: '',
      content: ''
    });
  }

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
        this.pschit.forEach(val => {
          if(val[0])
          {
            datas = val[0];
            usersstatus.push(datas);
          }
          console.log(usersstatus);
          this.values = usersstatus;
        });

      }
      console.log(comms);
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

  /**
   * GESTION NOUVEAU COMMENTAIRE / FORM
   */

  onSubmit(data: Comment) {
    if (this.isFormComplete(data)) {
      this.bookService.add(data)
        .subscribe(() => {
          this.commentForm.reset();
          this.openSnackBar('Le livre a été ajouté');
        });
    }
  }
  private isFormComplete(data: Comment) {
    return data && (data.date && data.content && data.author);
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Super!', {
      duration: 5000,
    });
  }
}
