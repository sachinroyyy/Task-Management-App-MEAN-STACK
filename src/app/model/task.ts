export interface ITask {
  itemId: number;
  taskName: string;
  taskDescription: string;
  dueDate: Date;
  createdOn: Date;
  isCompleted: true;
  tags: string;
  completedOn: Date;
  priority: string;
}
// for the data which is going to send or bind with the form , always try to make interface
export class Task {
  itemId: number;
  taskName: string;
  taskDescription: string;
  dueDate: Date;
  createdOn: Date;
  isCompleted: boolean;
  tags: string;
  completedOn: Date;
  priority: string;

  constructor() {
    this.itemId = 0;
    this.taskName = '';
    this.taskDescription = '';
    this.dueDate = new Date();
    this.createdOn = new Date();
    this.isCompleted = false;
    this.tags = '';
    this.completedOn = new Date();
    this.priority = '';
  }
}
export interface ApiResponceModel {
  message: string;
  result: string;
  data: any;
}
