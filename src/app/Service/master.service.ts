import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponceModel, ITask, Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private apiUrl = 'http://localhost:5000/api/v1/task'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getAllTaskList(): Observable<ApiResponceModel> {
    return this.http.get<ApiResponceModel>(`${this.apiUrl}/getall`);
  }

  addTask(task: Task): Observable<ApiResponceModel> {
    return this.http.post<ApiResponceModel>(`${this.apiUrl}/addtask`, task);
  }

  updateTask(task: Task): Observable<ApiResponceModel> {
    return this.http.put<ApiResponceModel>(
      `${this.apiUrl}/update/${task.itemId}`,
      task
    );
  }

  deleteTask(id: number): Observable<ApiResponceModel> {
    return this.http.delete<ApiResponceModel>(`${this.apiUrl}/delete/${id}`);
  }
}
