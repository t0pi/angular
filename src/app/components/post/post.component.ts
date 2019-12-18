import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Post} from '../../models/post';
import {PostRepository} from '../../services/post.repository';

@Component({
  selector: 'ngu-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostRepository
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.post = this.postService.byId(params.get('id'));
    });
  }

}
