import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {UsersRepository} from '../../services/users.repository';

@Component({
  selector: 'ngu-feed',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;

  constructor(
    private userService: UsersRepository
  ) { }

  ngOnInit() {
    this.users = this.userService.all();
    const v = this.users;
    console.log(v);
    v.subscribe({
      next(value) {
        // tslint:disable-next-line: prefer-for-of
        for(let i = 0; i < value.length; i++)
        {
          console.log(value[i].pwd);
        }
      }
    });
  }
}
