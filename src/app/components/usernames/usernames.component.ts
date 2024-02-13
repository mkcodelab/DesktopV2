import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenerateUserService, User } from '../../services/generate-user.service';
import { CommonModule } from '@angular/common';



@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'usernames',
// <p *ngFor="let user of users">{{user.name}} {{user.surname}}</p>

  template: `
    <div>

      <p *ngFor="let username of usernames$ | async"> {{username}}</p>

      
    </div>
  `,
  styles: []
})

export class UsernamesComponent implements OnInit{

  constructor(private generateUserService: GenerateUserService ) {
  }

  users: User[] = [];

  users$ = of(this.users);
  usernames$ = this.users$.pipe(map((users: User[])=> users.map(user => user.name)));

  ngOnInit(): void {
    

    // cant see the values when assigning to array
    // this.users = this.generateUserService.generatePersonArray(20)

    // we can see if we push it to the array
    this.users.push(...this.generateUserService.generatePersonArray(20))

  }
 

}