import { TaskStatus } from '../constants/TaskStatus';

export class Task {
  public title: string = '';
  public description: string = '';
  public status: TaskStatus = TaskStatus.TODO;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }

  changeStatus(newStatus: TaskStatus) {
    this.status = newStatus;
  }
}
