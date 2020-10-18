import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/Task';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  public taskList: Task[] = [];

  public newTaskForm: FormGroup;

  public maxLengthDescription: number = 250;

  public taskArchivedMessage: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newTaskForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl(
        '',
        Validators.maxLength(this.maxLengthDescription)
      ),
    });
  }

  get title() {
    return this.newTaskForm.get('title');
  }
  get description() {
    return this.newTaskForm.get('description');
  }

  onSubmit() {
    this.newTaskForm.clearValidators();

    if (this.newTaskForm.valid) {
      var existingTask = this.taskList.find(
        (task) => task.title === this.title.value
      );

      if (!existingTask) {
        this.taskList.push(new Task(this.title.value, this.description.value));
      } else {
        this.title.setErrors({ notUnique: true });
      }
    }
  }

  onReceiveTaskArchivedMessage($event: string) {
    this.taskArchivedMessage = `Task ${$event} has been archived`;
  }
}
