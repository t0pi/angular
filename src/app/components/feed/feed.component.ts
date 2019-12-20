
import {Component, OnInit, OnChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../../models/post';
import {Comment} from '../../models/comment';
import {PostRepository} from '../../services/post.repository';
import {CommentRepository} from '../../services/comment.repository';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Likes} from '../../models/likes';
import {LikesRepository} from '../../services/likes.repository';
import { Router } from '@angular/router';


@Component({
  selector: 'ngu-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  feed: Observable<Post[]>;
  post: Observable<Comment[]>;
  pschit: Observable<Comment[]> ;
  likes: Likes[];
  commentForm: FormGroup;
  postForm: FormGroup;
  values: any;
  isValid = false;
  constructor(
    private postService: PostRepository,
    private commentService: CommentRepository,
    private likesService: LikesRepository,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
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
    let l = this.likesService.all();
    l.subscribe(data => {
      console.log(data);
      if(data.length > 0)
      {
        let arr = [];
        let compteur = 1;
        let index = data[0].post;
        let item = {post:index, author: 0};
        for(let i = 1; i < data.length; i++)
        {
          if(data[i].post === index) {
            compteur++;
            if(i === data.length -1)
            {
              item.author = compteur;
              arr.push(item);
            }
          } else {
            item.author = compteur;
            arr.push(item);
            index = data[i].post;
            item = {post: data[i].post, author: 1};
            compteur = 1;
          }
        }
        this.likes = arr;
        console.log(this.likes);
      }
    })

    //this.likesService.all().toPromise().then(date => {
    //  console.log(date);
    //})

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
    let today1 = new Date();
    let c = today1.toString();
    let arr = {"Dec" : "12"};
    c = c.split(' ')[3]+ "-" + arr[c.split(' ')[1]]  + "-" + c.split(' ')[2] + ' ' + c.split(' ')[4];

    const inf: Post = {
      author : this.postForm.value.author,
      content: this.postForm.value.content,
      postdate : c,
      title: this.postForm.value.title
    };
    this.postService.add(inf).subscribe(() => {
        this.postForm.reset();
        this.openSnackBar('Le post a été ajouté');
        window.location.reload();
      });

  }

  likeUnlike(item)
  {
    this.openSnackBar('Like pris en compte');
    const inf: Likes = {
      author: localStorage.getItem('id'),
      post : String(item)
    };
    console.log(inf);
    this.likesService.add(inf).subscribe(data => {
    });
    // window.location.reload();
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
