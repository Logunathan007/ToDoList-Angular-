import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StoreService } from '../_services/store.service';
import { TaskModel } from '../models/TaskModel';
import { OutPutModel } from '../models/OutPutModel';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.css'
})
export class InputBoxComponent implements OnInit{
  taskModel!:TaskModel;

  search = "";

  // this.datas.filter((ele:any)=>ele.name.toLowerCase().includes(this.search.toLowerCase()))

  constructor(public ss:StoreService){
    this.taskModel = {
      id: '',
      name: ''
    };
  }

  ngOnInit(): void {
  }

  onAdd():void{
    if(!this.taskModel.name) return;
    this.ss.AddNew(this.taskModel.name).subscribe({
      next:(res:OutPutModel)=>{
        if(res.flag){
          console.log("Successfully added");
        }else{
          console.log("Fail to add");
        }
      },
      error:(e)=>{
        console.log("Error occured");
      }
    })
  }

  Change():void{
    this.ss.SearchChange(this.search);
  }
}
