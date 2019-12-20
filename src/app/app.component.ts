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
  yolo: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // Need to change session patterns
    if(localStorage.getItem('id')) {
      this.yolo = true;
    } else {
      this.yolo = false;
    }
  }
  goToContacts() {
    this.router.navigate(['/contacts']);
  }

  goToFeed() {
    this.router.navigate(['/feed']);
  }
}
