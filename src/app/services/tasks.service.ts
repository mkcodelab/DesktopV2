import { Injectable } from '@angular/core';
import { ListFetchingError } from '../components/tasks/list-state.type';
import { Task } from '../components/tasks/tasks.component';
import { wait } from './wait';

export type TaskUpdatePayload = {name?: string, done?: boolean}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private URL = 'http://localhost:3000';

  async getAll() {
    await wait(50);
    return fetch(`${this.URL}/tasks`).then<Task[] | ListFetchingError>(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        return { status: response.status, message: response.statusText };
      }
    );
  }

  async add(name: string) {

    return fetch(`${this.URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        createdAt: new Date().getTime(),
        name,
        done: false,
        isEditMode: false
      }),
    }).then<Task | Error>((response) => {
      if (response.ok) {
        return response.json();
      }
      return new Error('Cant add task');
    });
  }

  async delete(taskId: number) {
    return fetch(`${this.URL}/tasks/${taskId}`, {
      method: 'DELETE',
    }).then<Error | undefined>((response) => {
      if (response.ok) {
        return response.json();
      }
      return new Error('Cant delete task');
    });
  }

  async update(taskId: number, payload: TaskUpdatePayload) {
    fetch(`${this.URL}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.ok) {
        return response.json
      }
      return new Error('Cant update task')
    })
  }
}
