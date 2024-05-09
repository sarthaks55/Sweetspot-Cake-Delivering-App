import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Router } from '@angular/router';
import { User } from '../../shared/models/User';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User> = this.userSubject.asObservable();

  constructor(private router: Router) {}

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: User): Observable<User> {
    const storedUser = this.getUserFromLocalStorage();
    if (storedUser && storedUser.email === userLogin.email && storedUser.password === userLogin.password) {
      this.userSubject.next(storedUser);
      return this.userObservable;
    } else {
      alert('Invalid email or password');
      return new Observable<User>();  // Return an empty observable if login fails
    }
  }

  register(userRegister: User): Observable<User> {
    this.setUserToLocalStorage(userRegister);
    this.userSubject.next(userRegister);
    return this.userObservable;
  }

  logout(): void {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/login');
    window.location.reload();
  }

  public setUserToLocalStorage(user: User): void { // Change method to public
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserFromLocalStorage(): User { // Change method to public
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : new User();
  }
}
