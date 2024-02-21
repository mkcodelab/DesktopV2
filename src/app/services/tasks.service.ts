import { Injectable, inject } from '@angular/core';
import { ListFetchingError } from '../components/tasks/list-state.type';
import { Task } from '../components/tasks/tasks.component';
import { wait } from './wait';
import { HttpClient } from '@angular/common/http';

export type TaskUpdatePayload = {name?: string, done?: boolean}

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  // constructor() {
  //   this.http.get(this.URL + '/tasks').subscribe((response)=> {
  //     console.log(response)
  //   })
  // }

  private http = inject(HttpClient)

  private URL = 'http://localhost:3000';

  // async
   getAll() {
    // await wait(50);
    // return fetch(`${this.URL}/tasks`).then<Task[] | ListFetchingError>(
    //   (response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     return { status: response.status, message: response.statusText };
    //   }
    // );
     return this.http.get<Task[]>(this.URL + '/tasks')
  }

  // async
  add(name: string){

    return this.http.post(this.URL + '/tasks',  {
      createdAt: new Date().getTime(),
      name,
      done: false,
      isEditMode: false
    })


    // return fetch(`${this.URL}/tasks`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     createdAt: new Date().getTime(),
    //     name,
    //     done: false,
    //     isEditMode: false
    //   }),
    // }).then<Task | Error>((response) => {
    //   if (response.ok) {
    //     return response.json();
    //   }
    //   return new Error('Cant add task');
    // });
  }

  delete(taskId: number) {
    return this.http.delete(this.URL + '/tasks/' + taskId)
    // return fetch(`${this.URL}/tasks/${taskId}`, {
    //   method: 'DELETE',
    // }).then<Error | undefined>((response) => {
    //   if (response.ok) {
    //     return response.json();
    //   }
    //   return new Error('Cant delete task');
    // });
  }

  update(taskId: number, payload: TaskUpdatePayload) {

    return this.http.patch(this.URL + '/tasks/' + taskId, payload)

    // fetch(`${this.URL}/tasks/${taskId}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(payload)
    // }).then(response => {
    //   if (response.ok) {
    //     return response.json
    //   }
    //   return new Error('Cant update task')
    // })
  }
}
