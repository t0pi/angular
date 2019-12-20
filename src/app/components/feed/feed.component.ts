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
  feed: any;
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
      postDate: '',
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
      let finalFeed = [];
      this.postService.all();
      this.postService.all().subscribe(data => {
        if(data.length > 0) {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < data.length; i++) {
            let items =
            {
              date: data[i].postdate,
              userId: data[i].author,
              userName: '',
              content: data[i].content,
              postId: data[i].id
            };
            finalFeed.push(items);
          }
        }
      });
      const l = this.likesService.all();
      this.usersService.all().subscribe(data => {
        this.users = data;
        // tslint:disable-next-line: prefer-for-of
        for ( let i = 0; i < finalFeed.length; i++) {
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < this.users.length; j++) {

            if (finalFeed[i].userId == this.users[j].id) {
              finalFeed[i].userName = this.users[j].name;
            }
          }
        }
      });
      this.feed = finalFeed;
      l.subscribe(data => {
        console.log(data);
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
        }
      });
      const arr = [];
      this.postService.all().toPromise().then(data => {
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
      author : localStorage.getItem('id'),
      content: this.postForm.value.content,
      postdate : c,
      title: 'hello'
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
