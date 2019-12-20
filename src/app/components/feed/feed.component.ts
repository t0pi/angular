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
import { User} from '../../models/user';
import { UsersRepository } from '../../services/users.repository';

@Component({
  selector: 'ngu-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  feed: Observable<Post[]>;
  post: Observable<Comment[]>;
  users: User[];
  pschit: Observable<Comment[]>;
  likes: Likes[];
  commentForm: FormGroup;
  postForm: FormGroup;
  values: any;
  isLiked: boolean;

  //isValid = false;
  constructor(
    private postService: PostRepository,
    private commentService: CommentRepository,
    private likesService: LikesRepository,
    private usersService: UsersRepository,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.postForm = this.formBuilder.group({
      title: 'Titre',
      postdate: '',
      author: localStorage.getItem('id'),
      content: ['', Validators.required]
    });
    this.commentForm = this.formBuilder.group({
      author: 'Sylvanas Windrunner',
      postid: '3',
      content: ''
    });
  }

  ngOnInit() {
      if(localStorage.getItem('id'))
      {
      this.feed = this.postService.all();
      this.feed.subscribe(data => {
        console.log(data);
      })
      const l = this.likesService.all();
      this.usersService.all().subscribe(data => {
        this.users = data;
        console.log(this.users);
      });
      l.subscribe(data => {
        if (data.length > 0)
        {
          let arr = [];
          let compteur = 1;
          let index = data[0].post;
          let item = {post: index, author: 0};
          for (let i = 1; i < data.length; i++)
          {
            if (data[i].post === index) {
              compteur++;
              if (i === data.length - 1)
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
      });

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
        console.log(this.values);
      });
      // tslint:disable-next-line: prefer-for-of
    } else {
      this.router.navigate(['']);
    }
  }
  // tslint:disable-next-line: use-lifecycle-interface

  // tslint:disable-next-line: use-lifecycle-interface
  /**
   * ******** NOUVEAU POST
   */
  onSubmitPost() {
    const today1 = new Date();
    let c = today1.toString();
    const arr = {Dec : '12', Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11'};
    c = c.split(' ')[3] + '-' + arr[c.split(' ')[1]]  + '-' + c.split(' ')[2] + ' ' + c.split(' ')[4];

    const inf: Post = {
      author : this.postForm.value.author,
      content: this.postForm.value.content,
      postdate : c,
      title: this.postForm.value.title
    };
    this.postService.add(inf).subscribe(() => {
        this.postForm.reset();
        this.openSnackBar('Le post a été ajouté');
        this.router.navigate(['/feed']);
      });
  }

  likeUnlike(item)
  {
    const inf: Likes = {
      author: localStorage.getItem('id'),
      post : String(item)
    };
    /**let boule = true;
    this.likesService.byId(inf.post, inf.author).subscribe(data => {
      console.log(data);
      if(data[0].post)
      {
        this.isLiked = true;
        this.openSnackBar('Vous avez déjà like !');
      } else {
        this.isLiked = false;
      }
    });*/
    this.likesService.add(inf).subscribe(datas => {
      console.log(datas);
      // this.openSnackBar('Like pris en compte');
      this.router.navigate(['/feed']);
    });
  }
  onSubmitComment(id) {
    console.log(id);
    const today1 = new Date();
    let c = today1.toString();
    const arr = {Dec : '12', Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11'};
    c = c.split(' ')[3] + '-' + arr[c.split(' ')[1]]  + '-' + c.split(' ')[2] + ' ' + c.split(' ')[4];

    const inf: Comment = {
      author : this.commentForm.value.author,
      content: this.commentForm.value.content,
      postid: String(id),
      date : c
    };
    this.commentService.add(inf).subscribe(() => {
        this.commentForm.reset();

      });
    this.openSnackBar('Le commentaire a été posté !');
    this.router.navigate(['/feed']);

    }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
    });
  }

}
