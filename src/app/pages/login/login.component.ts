import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  user: UserModel = new UserModel();

  constructor() {}
  ngOnInit(): void {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(this.user);
    console.log(form);
  }
}
