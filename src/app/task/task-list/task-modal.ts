import { TaskListComponent } from './task-list.component';

export class TaskModal {

  constructor(private currentTask: noosfero.Task, private confirmationTask: noosfero.Task,
    private taskList: TaskListComponent) { }
}