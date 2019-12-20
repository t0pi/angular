import { Component, OnInit } from '@angular/core';
import { User} from '../../models/user';
import { UsersRepository } from '../../services/users.repository';

@Component({
  selector: 'ngu-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  users: User[];
  constructor(
    private usersService: UsersRepository
  ) { }

  ngOnInit() {
    this.usersService.all().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }
}
