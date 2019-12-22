import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {UsersRepository} from '../../services/users.repository';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

// import custom validator to validate that password and confirm password fields match

@Component({
  selector: 'ngu-feed',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private userService: UsersRepository,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
  showPw() {
    if (document.getElementById('pw').type === 'text') {
      document.getElementById('pw').type = 'password';
      document.getElementById('cPw').type = 'password';

    } else {
      document.getElementById('pw').type = 'text';
      document.getElementById('cPw').type = 'text';

    }
  }
  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        mail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
    });
      this.users = this.userService.all();
      const v = this.users;
      v.subscribe(data => {
          console.log(data);
        }
      );
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      const u = this.userService.findByMail(this.registerForm.value.mail);
      u.toPromise().then(date => {
        if (date[0]) {
          this.openSnackBar('Le compte existe déjà');
        } else {

          const inf: User = {
            mail: this.registerForm.value.mail,
            name: this.registerForm.value.name,
            pwd : this.registerForm.value.password
          };

          this.userService.add(inf).subscribe((data) => {
            localStorage.setItem('id', data.id);
            console.log(localStorage);
            this.openSnackBar('Compte créé, redirection en cours...');
            this.registerForm.reset();
            this.router.navigate(['/feed']);
          });
        }
      });
    } else {
      this.openSnackBar('Les mots de passe ne correspondent pas...');
    }
}

goToLogin() {
  this.router.navigate(['/login']);
}
timeout() {
  setTimeout(() => {
      this.timeout();
  }, 2000);
}
onReset() {
  this.submitted = false;
  this.registerForm.reset();
}
private openSnackBar(message: string) {
  this.snackBar.open(message, 'Super!', {
    duration: 5000,
  });
}
}
