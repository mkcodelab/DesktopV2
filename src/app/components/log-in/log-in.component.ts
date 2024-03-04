import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'log-in',
  template: `
    <div class="flex">
      <p class="text-lg mr-2">Log in component</p>
      <p>{{ userName }}</p>
      <p>logged in: {{ loggedIn }}</p>
    </div>
  `,
  imports: [],
})
export class LogInComponent {
  loggedIn = false;
  userName = '';
  logIn() {
    console.log('user logged in');
  }
}
