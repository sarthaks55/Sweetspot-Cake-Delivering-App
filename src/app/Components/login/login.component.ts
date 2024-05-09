import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { TextInputComponent } from '../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../partials/default-button/default-button.component';
import { InputContainerComponent } from '../partials/input-container/input-container.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';
import { User } from '../../shared/models/User';



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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
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
  
    const email = this.fc['email'].value;
    const password = this.fc['password'].value;
  
    const user: User = {
      name: '', 
      address: '',
      email,
      password
    };
  
    this.userService.login(user).subscribe({
      next: (loggedInUser) => {
        // Redirect to dashboard or any other page upon successful login
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle error here, if needed
      }
    });
  }
  
}
