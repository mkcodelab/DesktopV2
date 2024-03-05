import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http';
import { JsonPipe, NgClass, NgIf } from '@angular/common';

export interface UserInterface {
  email: string,
  username: string,
  bio: string | null,
  image: string,
  token: string
}

@Component({
  standalone: true,
  selector: 'log-in',
  imports: [FormsModule, NgIf, NgClass, JsonPipe],
  templateUrl: './log-in.component.html'
})
export class LogInComponent {
  private url = 'https://api.realworld.io/api/';

  isLoggedIn = false;
  username = '';
  password = '';
  email = '';

  isRegisterActive = true

  app = inject(AppComponent);

  http = inject(HttpClient);

  success = false

  userResponseData: { user: UserInterface | undefined } = { user: undefined }

  submit() {

    if (this.isRegisterActive) {
      this.register()
    } else {
      this.login()
    }

    if (this.success) {
      this.closeModal();

    }
  }

  closeModal() {
    this.app.closeCentralModal('log-in-modal');
  }

  login() {
    const payload = {
      user: {
        email: this.email,
        password: this.password
      }
    }
    this.http.post<{ user: UserInterface }>(this.url + 'users/login', payload).subscribe((response) => {
      console.log(response);
      this.userResponseData = response
      this.isLoggedIn = true
    });
  }

  register() {
    const payload = {
      user: {
        username: this.username,
        email: this.email,
        password: this.password
      }
    }
    this.closeModal();
    this.http.post<{ user: UserInterface }>(this.url + 'users', payload).subscribe((response) => {
      console.log(response);
    });
  }
}
