import { Router } from '@angular/router';
import {Component} from '@angular/core';
import {UsersRepository} from './services/users.repository';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'ngu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn: any;
  constructor(
    private router: Router
  ) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    // Need to change session patterns
    if (localStorage.getItem('id')) {
      this.router.navigate(['/feed']);
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
  goToContacts() {
    this.router.navigate(['/contacts']);
  }

  goToFeed() {
    this.router.navigate(['/feed']);
  }
}
