import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { TextInputComponent } from '../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../partials/default-button/default-button.component';
import { InputContainerComponent } from '../partials/input-container/input-container.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';
import { IUserLogin, User } from '../../shared/models/User';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule,TitleComponent,TextInputComponent,DefaultButtonComponent,InputContainerComponent,ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit(): void {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const userLogin: IUserLogin = {
      email: this.fc['email'].value,
      password: this.fc['password'].value
    };

    this.userService.login(userLogin).subscribe({
      next: (loggedInUser) => {
        if (loggedInUser.isAdmin) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate([this.returnUrl]);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}