import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { ModalService } from '../modal-container/modal.service';

export interface UserInterface {
  email: string;
  username: string;
  bio: string | null;
  image: string;
  token: string;
}

@Component({
  standalone: true,
  selector: 'log-in',
  imports: [FormsModule, NgIf, NgClass, JsonPipe],
  templateUrl: './log-in.component.html',
  styles: `
    .username-taken {
      border: 2px solid #a94442;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogInComponent {
  private url = 'https://api.realworld.io/api/';

  isLoggedIn = false;

  user = {
    username: '',
    password: '',
    email: '',
  };

  usernameTaken = false;

  isRegisterActive = true;

  app = inject(AppComponent);

  http = inject(HttpClient);

  modalService = inject(ModalService);

  success = false;

  userResponseData: { user: UserInterface | undefined } = { user: undefined };

  submit() {
    if (this.isRegisterActive) {
      this.register();
    } else {
      this.login();
    }

    if (this.success) {
      this.closeModal();
    }
  }

  closeModal() {
    this.modalService.closeCentralModal('log-in-modal');
  }

  login() {
    const payload = {
      user: {
        email: this.user.email,
        password: this.user.password,
      },
    };
    this.http
      .post<{ user: UserInterface }>(this.url + 'users/login', payload)
      .subscribe((response) => {
        console.log(response);
        this.userResponseData = response;
        this.isLoggedIn = true;
      });
  }

  register() {
    this.usernameTaken = false;
    const payload = {
      user: {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      },
    };
    this.http
      .post<{ user: UserInterface } | Error>(this.url + 'users', payload)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (response) => {
          console.log(response);
          if (response.error.errors.hasOwnProperty('username')) {
            this.usernameTaken = true;
          }
        },
      });
  }
}
