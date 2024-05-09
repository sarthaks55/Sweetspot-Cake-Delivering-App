import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IUserRegister } from '../../shared/models/User'; // Assuming IUserRegister is exported from there
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { TextInputComponent } from '../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../partials/default-button/default-button.component';
import { InputContainerComponent } from '../partials/input-container/input-container.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule,TitleComponent,TextInputComponent,DefaultButtonComponent,InputContainerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;  // Non-null assertion
  isSubmitted = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit(): void {
    this.isSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser: IUserRegister = {
      name: this.fc['name'].value,
      email: this.fc['email'].value,
      password: this.fc['password'].value,
      address: this.fc['address'].value,
      confirmPassword: ''
    };

    this.userService.register(newUser).subscribe({
      next: (user) => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Registration failed');
        console.error(err);
      }
    });
  }
}
