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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: Observable<User[]>;
  loginForm: FormGroup;
  constructor(
    private userService: UsersRepository,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        mail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
      this.users = this.userService.all();
      const v = this.users;
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.value.password.length >= 6) {
      const u = this.userService.findByMail(this.loginForm.value.mail);
      u.toPromise().then(date => {
        if(date[0]) {
          console.log(date[0].id);
          this.openSnackBar('Connexion confirmée, redirection en cours...');
          localStorage.setItem('id', date[0].id);
          console.log(localStorage);
          this.loginForm.reset();
          this.router.navigate(['/feed']);

        } else {
          this.openSnackBar('Compte non répertorié / erreur dans le formulaire');
        }
      });
    } else {
      this.openSnackBar('Les mots de passe ne peuvent être inférieurs à 6 charactères.');
      // this.loginForm.invalid;
    }

}
goToReg() {
  this.router.navigate(['']);
}
timeout() {
  setTimeout(() => {
      this.timeout();
  }, 2000);
}
private openSnackBar(message: string) {
  this.snackBar.open(message, 'Super!', {
    duration: 5000,
  });
}
}
