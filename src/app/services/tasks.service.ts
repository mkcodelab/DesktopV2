import { Injectable, inject } from '@angular/core';
import { Task } from '../components/tasks/tasks.component';
import { HttpClient } from '@angular/common/http';

export type TaskUpdatePayload = { name?: string; done?: boolean };

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  private URL = 'http://localhost:3000';

  getAll() {
    return this.http.get<Task[]>(this.URL + '/tasks');
  }

  add(name: string) {
    return this.http.post(this.URL + '/tasks', {
      createdAt: new Date().getTime(),
      name,
      done: false,
      isEditMode: false,
    });
  }

  delete(taskId: number) {
    return this.http.delete(this.URL + '/tasks/' + taskId);
  }

  update(taskId: number, payload: TaskUpdatePayload) {
    return this.http.patch(this.URL + '/tasks/' + taskId, payload);
  }
}
