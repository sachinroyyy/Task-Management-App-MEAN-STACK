import { MasterService } from './Service/master.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiResponceModel, ITask, Task } from './model/task';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, FormsModule, NgFor, NgIf],
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

  resetTaskObj() {
    this.taskObj = new Task();
  }

  addTask() {
    if (
      this.taskObj.taskName &&
      this.taskObj.dueDate &&
      this.taskObj.priority &&
      this.taskObj.status
    ) {
      // Clone the task object to avoid reference issues
      const newTask = { ...this.taskObj, itemId: this.taskList.length + 1 };
      this.taskList.push(newTask);

      // Reset the taskObj for new task entry
      this.resetTaskObj();
    } else {
      alert('Please fill in all fields');
    }
  }

  onEdit(item: Task) {
    this.taskObj = { ...item }; // Clone the object to avoid reference issues
    setTimeout(() => {
      const dat = new Date(this.taskObj.dueDate);
      const day = ('0' + dat.getDate()).slice(-2);
      const month = ('0' + (dat.getMonth() + 1)).slice(-2);
      const today = dat.getFullYear() + '-' + month + '-' + day;
      (<HTMLInputElement>document.getElementById('textDate')).value = today;
    }, 0);
  }

  updateTask() {
    const index = this.taskList.findIndex(
      (task) => task.itemId === this.taskObj.itemId
    );
    if (index !== -1) {
      this.taskList[index] = { ...this.taskObj }; // Update the task in the list
      this.resetTaskObj();
    } else {
      alert('Task not found for update.');
    }
  }

  onDelete(id: number) {
    const isConfirm = confirm('Are you sure you want to delete this task?');
    if (isConfirm) {
      // Find the index of the task with the given id
      const index = this.taskList.findIndex((task) => task.itemId === id);

      if (index !== -1) {
        // Remove the task from the list
        this.taskList.splice(index, 1);

        // If you are using an API to delete the task on the server
        this.masterService.deleteTask(id).subscribe(
          (res: ApiResponceModel) => {
            if (res.result) {
              alert('Task deleted successfully');
              this.loadAllTask(); // Optionally reload the task list from the server
            }
          },
          (error) => {
            alert('API call error');
          }
        );
      } else {
        alert('Task not found for deletion.');
      }
    }
  }
  // sortTasks() {
  //   this.taskList.sort((a, b) => {
  //     const fieldA = a[this.sortedBy];
  //     const fieldB = b[this.sortedBy];

  //     if (this.sortOrder === 'asc') {
  //       return fieldA > fieldB ? 1 : -1;
  //     } else {
  //       return fieldA < fieldB ? 1 : -1;
  //     }
  //   });
  // }

  // onSort(field: string) {
  //   this.sortedBy = field;
  //   this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  //   this.sortTasks();
  // }
}
