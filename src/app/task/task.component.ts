import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/Task';
import { TaskStatus } from '../constants/TaskStatus';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  @Output() onTaskArchived = new EventEmitter<string>();

  private AvailableStatusChange = new Map<TaskStatus, TaskStatus[]>();

  constructor() {}

  ngOnInit(): void {
    this.AvailableStatusChange.set(TaskStatus.TODO, [
      TaskStatus['IN-PROGRESS'],
      TaskStatus.ARCHIVED,
    ]);
    this.AvailableStatusChange.set(TaskStatus['IN-PROGRESS'], [
      TaskStatus.DONE,
    ]);
    this.AvailableStatusChange.set(TaskStatus.DONE, [TaskStatus.ARCHIVED]);
    this.AvailableStatusChange.set(TaskStatus.ARCHIVED, []);
  }

  get availableStatuses(): TaskStatus[] {
    return this.AvailableStatusChange.get(this.task.status);
  }

  get isCannotChangeStatus(): boolean {
    return this.availableStatuses.length === 0;
  }

  getStatusString(status: TaskStatus) {
    return TaskStatus[status];
  }

  changeStatus(newStatus: TaskStatus) {
    this.task.changeStatus(newStatus);
    newStatus === TaskStatus.ARCHIVED &&
      this.onTaskArchived.emit(this.task.title);
  }
}
