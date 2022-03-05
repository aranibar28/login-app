import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  user: UserModel = new UserModel();
  remember: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email') || '';
      this.remember = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere Porfavor',
    });
    Swal.showLoading();

    this.auth.login(this.user).subscribe({
      next: (res) => {
        console.log(res);
        Swal.close();

        if (this.remember) {
          localStorage.setItem('email', this.user.email);
        }

        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.error.message,
        });
      },
    });
  }
}
