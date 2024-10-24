import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskModel } from '../models/TaskModel';
import { OutPutModel } from '../models/OutPutModel';

@Injectable({
  providedIn: 'root'
})
export class StoreService{
  URL:string = "https://localhost:7279/"

  searchString:BehaviorSubject<string> = new BehaviorSubject("")

  constructor(private httpClient:HttpClient) {  }

  getAll():Observable<TaskModel[]>{
    return this.httpClient.get<TaskModel[]>(this.URL);
  }
  AddNew(name:string):Observable<OutPutModel>{
    return this.httpClient.post<OutPutModel>(this.URL,{name});
  }
  UpdateName(task:TaskModel):Observable<OutPutModel>{
    return this.httpClient.put<OutPutModel>(this.URL,task);
  }
  DeleteName(id:string):Observable<OutPutModel>{
    return this.httpClient.delete<OutPutModel>(this.URL+id);
  }
  SearchChange(newString:string){
    this.searchString.next(newString);
  }
}
