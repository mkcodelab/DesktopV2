import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { TaskService, TaskUpdatePayload } from '../../services/tasks.service';
import { TaskListState } from './list-state.type';
import { CustomDatePipe } from '../../utils/custom-date.pipe';

export type Task = {
  id: number;
  name: string;
  done: boolean;
  isEditMode: boolean;
  createdAt: Date;
};

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, CustomDatePipe],
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  private taskService = inject(TaskService);
  private ref = inject(ChangeDetectorRef);

  listState: TaskListState<Task> = { state: 'idle' };

  ngOnInit() {
    this.listState = { state: 'loading' };
    this.getAll();
  }

  getAll() {
    this.taskService.getAll().subscribe({
      next: (response) => {
        this.listState = { state: 'success', results: response };
      },
      error: (err) => {
        this.listState = { state: 'error', error: err };
      },
    });
  }

  editTask(taskId: number) {
    this.toggleTaskEdit(taskId, true);
  }

  toggleTaskEdit(taskId: number, to: boolean) {
    if (this.listState.state === 'success') {
      let taskToEdit = this.listState.results.find(
        (task) => task.id === taskId
      );

      if (taskToEdit) {
        taskToEdit.isEditMode = to;
      }
    }
  }

  addTask(name: string, tasks: Task[]) {
    this.taskService.add(name).subscribe({
      next: (response: any) => {
        this.listState = {
          state: 'success',
          results: tasks.concat(response),
        };
        this.ref.detectChanges();
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  deleteTask(taskId: number) {
    this.taskService.delete(taskId).subscribe(() => {
      // this.getAll()
      if (this.listState.state === 'success') {
        this.listState.results = this.listState.results.filter((task) => {
          return task.id !== taskId;
        });
        this.ref.detectChanges();
      }
    });
  }

  updateTask(taskId: number, payload: TaskUpdatePayload) {
    this.taskService.update(taskId, payload).subscribe(() => {
      this.toggleTaskEdit(taskId, false);

      //   updating view
      if (this.listState.state === 'success') {
        const taskToChange = this.listState.results.find(
          (task) => task.id === taskId
        );
        if (payload.name && taskToChange) {
          taskToChange.name = payload.name;
        }
        this.ref.detectChanges();
      }
    });
  }

  cancelUpdate(taskId: number) {
    this.toggleTaskEdit(taskId, false);
  }

  toggleDoneState(taskId: number) {
    if (this.listState.state === 'success') {
      let taskToEdit = this.listState.results.find(
        (task) => task.id === taskId
      );
      if (taskToEdit !== undefined) {
        // update the view
        taskToEdit.done = !taskToEdit.done;
        // send update to backend
        this.taskService.update(taskId, { done: taskToEdit.done }).subscribe();
      }
    }
  }

  get visibleTasks(): Task[] | [] {
    if (this.listState.state === 'success') {
      return this.listState.results;
    } else return [];
  }
}
