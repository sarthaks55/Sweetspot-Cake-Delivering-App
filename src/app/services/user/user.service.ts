import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IUserLogin, IUserRegister, User } from '../../shared/models/User';

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

  login(userLogin: IUserLogin): Observable<User> {
    const storedUser = this.getUserFromLocalStorage();
    if (storedUser && storedUser.email === userLogin.email && storedUser.password === userLogin.password) {
      this.userSubject.next(storedUser);
      return this.userObservable;
    } else if (userLogin.email === "admin@gmail.com" && userLogin.password === "123456") {
      const adminUser: User = {
        name: 'Admin',
        email: "admin@gmail.com",
        password: "123456",
        address: 'Admin Address',
        isAdmin: true
      };
      this.setUserToLocalStorage(adminUser);
      this.userSubject.next(adminUser);
      return this.userObservable;
    } else {
      alert('Invalid email or password');
      return new Observable<User>();  // Return an empty observable if login fails
    }
  }

  register(userRegister: IUserRegister): Observable<User> {
    const newUser: User = {
      ...userRegister,
      isAdmin: false  // Set default to false, update accordingly for admin
    };
    this.setUserToLocalStorage(newUser);
    this.userSubject.next(newUser);
    return this.userObservable;
  }

  logout(): void {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/login');
  }

  public setUserToLocalStorage(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : new User();
  }
}
