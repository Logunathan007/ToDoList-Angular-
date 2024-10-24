import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { StoreService } from '../_services/store.service';
import { TaskModel } from '../models/TaskModel';

@Component({
  selector: 'app-output-box',
  templateUrl: './output-box.component.html',
  styleUrl: './output-box.component.css'
})

export class OutputBoxComponent implements OnInit{
  taskModels:TaskModel[];
  search = "";
  copyTaskModels:TaskModel[];
  // this.datas.filter((ele:any)=>ele.name.toLowerCase().includes(this.search.toLowerCase()))

  constructor(public ss:StoreService){
    this.taskModels = []
  }
  ngOnInit(): void {
    this.getAllDatas();
    this.ss.searchString.subscribe({
      next:(data:string)=>{
        this.search = data;
        this.copyTaskModels = this.taskModels.filter((ele:any)=>ele.name.toLowerCase().includes(data.toLowerCase()))
      }
    })
  }
  getAllDatas():void{
    this.ss.getAll().subscribe({
      next:(res:TaskModel[])=>{
        this.taskModels = res;
        this.copyTaskModels = res;
        console.log(res);
      },
      error:(e)=>{
        console.log(e.message);
      }
    });
  }
  deleteLocally(id:string){
    this.taskModels = this.taskModels.filter((obj:TaskModel)=> obj.id != id);
    this.ss.SearchChange(this.search);
  }
}
