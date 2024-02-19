import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TaskService, TaskUpdatePayload } from '../../services/tasks.service';
import { TaskListState } from './list-state.type';
import { CustomDatePipe } from '../../utils/custom-date.pipe';

export type Task = {
  id: number;
  name: string;
  done: boolean;
  isEditMode: boolean
  createdAt: Date
};

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, CustomDatePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  // DI by inject
  private taskService = inject(TaskService);
  // DI by constructor
  // constructor(private taskService: TaskService) {}

  listState: TaskListState<Task> = { state: 'idle' };
  
  ngOnInit() {
    this.listState = { state: 'loading' };
    this.getAll()
    
  }

  getAll() {
    this.taskService.getAll().then((response) => {
      if (Array.isArray(response)) {
        this.listState = { state: 'success', results: response };
      } else {
        this.listState = { state: 'error', error: response };
      }
    });
  }

  editTask(taskId: number) {
    this.toggleTaskEdit(taskId, true)
  }

  toggleTaskEdit(taskId: number, to: boolean) {
    if(this.listState.state === 'success') {
      let taskToEdit = this.listState.results.find( task => task.id === taskId)

      if (taskToEdit) {
        if (to) {
          taskToEdit.isEditMode = true;
        } else {
          taskToEdit.isEditMode = false;
        }
      }
    }
  }

  addTask(name: string, tasks: Task[]) {
    this.taskService.add(name).then((response) => {
      if ('id' in response) {
        this.listState = {
          state: 'success',
          results: tasks.concat(response),
        };
      } else {
        alert(response.message);
      }
    });
  }

  deleteTask(taskId: number) {
    this.taskService.delete(taskId).then(() => {
      this.getAll()
    })
    
  }

  updateTask(taskId: number, payload: TaskUpdatePayload) {
    this.taskService.update(taskId, payload).then(() => {
     
      this.toggleTaskEdit(taskId, false)
      this.getAll()

    })
  }

  cancelUpdate(taskId: number) {
    this.toggleTaskEdit(taskId, false)
  }

  toggleDoneState(taskId: number) {
    if (this.listState.state === 'success'){
      let taskToEdit = this.listState.results.find( task => task.id === taskId)
      if (taskToEdit !== undefined) {
        // update the view
        taskToEdit.done = !taskToEdit.done
        // send update to backend
        this.taskService.update(taskId, {done: taskToEdit.done})
      }
      
    }
  }

}
