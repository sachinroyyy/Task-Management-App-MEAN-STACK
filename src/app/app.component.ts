import { MasterService } from './Service/master.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiResponceModel, ITask, Task } from './model/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  taskObj: Task = new Task();
  //then we will bind this with the form by ng model directive
  taskList: ITask[] = [];
  masterService = inject(MasterService);
  ngOnInit(): void {
    this.loadAllTask();
  }
  loadAllTask() {
    this.masterService.getAllTaskList().subscribe((res: ApiResponceModel) => {
      this.taskList = res.data;
    });
  }
  addTask() {
    this.masterService.addNewTask(this.taskObj).subscribe(
      (res: ApiResponceModel) => {
        if (res.result) {
          alert('Task added successfully');
          this.loadAllTask();
          this.taskObj = new Task();
        }
      },
      (error) => {
        alert('Error while adding task / api call error');
      }
    );
  }
  onEdit(item: Task) {
    this.taskObj = item;
    setTimeout(() => {
      const dat = new Date(this.taskObj.dueDate);
      const day = ('0' + dat.getDate()).slice(-2);
      const month = ('0' + (dat.getMonth() + 1)).slice(-2);
      const today = dat.getFullYear() + '-' + month + '-' + day;
      (<HTMLInputElement>document.getElementById('textDate')).value = today;
      // if(!dateField != null) {
      //   document.['value'] = today;

      // }
    }, 2000);
  }
  updateTask() {
    this.masterService.updateTask(this.taskObj).subscribe(
      (res: ApiResponceModel) => {
        if (res.result) {
          alert('Task updated successfully');
          this.loadAllTask();
          this.taskObj = new Task();
        }
      },
      (error) => {
        alert('api call error');
      }
    );
  }
  onDelete(id: number) {
    const isConfirm = confirm('Are you sure you want delete');
    if (isConfirm) {
      this.masterService.deleteTask(id).subscribe(
        (res: ApiResponceModel) => {
          if (res.result) {
            alert('Task deleted successfully');
            this.loadAllTask();
            this.taskObj = new Task();
          }
        },
        (error) => {
          alert(' api call error');
        }
      );
    }
  }
}
