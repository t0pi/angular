import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Comment} from '../../models/comment';
import {CommentRepository} from '../../services/comment.repository';

@Component({
  selector: 'ngu-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  comment: Observable<Comment[]>;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentRepository
  ) {}

  ngOnInit() {

  }
}
