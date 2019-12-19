import { CommentService } from './../../services/real/comment.service';
import { RouterModule } from '@angular/router';
import {Component, OnInit, OnChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {CommentComponent} from '../comment/comment.component';
import {Post} from '../../models/post';
import {Comment} from '../../models/comment';
import {PostRepository} from '../../services/post.repository';
import {CommentRepository} from '../../services/comment.repository';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  postForm: FormGroup;
  values: any;
  isValid = false;
  constructor(
    private postService: PostRepository,
    private commentService: CommentRepository,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.postForm = this.formBuilder.group({
      title: 'Titre',
      postdate: '',
      author: 'Sylvanas Windrunner',
      content: ['', Validators.required]
    });
    this.commentForm = this.formBuilder.group({
      dateComment: '2019-10-10 16:00:00',
      author: 'Sylvanas Windrunner',
      content: ''
    });
  }

  ngOnInit() {
    this.feed = this.postService.all();
    const arr = [];
    const v = this.feed.toPromise().then(data => {
      arr.push(data);

    }).then(dt => {
      const usersstatus = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < arr[0].length; i++) {
        this.pschit = this.postService.getPostComments(String(arr[0][i].id));
        this.pschit.forEach(val => {
          // tslint:disable-next-line: forin
          usersstatus.push(val);
          this.values = usersstatus;
        });

      }
    });
    // tslint:disable-next-line: prefer-for-of
  }
  // tslint:disable-next-line: use-lifecycle-interface

  // tslint:disable-next-line: use-lifecycle-interface
  /**
   * ******** NOUVEAU POST
   */
  onSubmitPost(data: Post) {
    console.log(this.postForm.value);
    const date = new Date();
    let d = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
    const inf: Post = {
      author : this.postForm.value.author,
      content: this.postForm.value.content,
      postdate : d,
      title: this.postForm.value.title
    };
    console.log(d);
    this.postService.add(inf).subscribe(() => {
        this.postForm.reset();
        this.openSnackBar('Le post a été ajouté');
      });

  }


  /**
   * ******** NOUVEAU COMMENTAIRE
   */
  onSubmitComment(data: Comment) {
    if (this.isCommentFormComplete(data)) {
      this.commentService.add(data)
        .subscribe(() => {
          this.commentForm.reset();
          this.openSnackBar('Le commentaire a été ajouté');
        });
    }
  }
  private isCommentFormComplete(data: Comment) {
    return data && (data.date && data.content && data.author);
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Super!', {
      duration: 5000,
    });
  }
}
