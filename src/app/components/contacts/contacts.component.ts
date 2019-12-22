import { Component, OnInit } from '@angular/core';
import { User} from '../../models/user';
import { UsersRepository } from '../../services/users.repository';

@Component({
  selector: 'ngu-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  loggedIn = true;
  users: User[];
  constructor(
    private usersService: UsersRepository
  ) { }

  async ngOnInit() {
    await this.usersService.all().subscribe(data => {
      this.users = data;
    });
  }
}
