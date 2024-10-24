import { TaskModel } from './../models/TaskModel';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { StoreService } from '../_services/store.service';
import { OutPutModel } from '../models/OutPutModel';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent{

  @Input("taskModel") taskModel:TaskModel;
  @Output("deleted") deleted:EventEmitter<string> = new EventEmitter();

  editName = ""
  isEditClicked = true;
  datas:any = []

  constructor(public ss:StoreService){}

  ngOnInit(): void {
    this.editName = this.taskModel.name;
  }

  toggleEdit(){
    this.isEditClicked = !this.isEditClicked;
  }

  saveValue(){
    if(!this.editName)return;
    this.taskModel.name = this.editName;
    this.ss.UpdateName(this.taskModel).subscribe({
      next:(res:OutPutModel)=>{
        console.log(res);
      },
      error:(e)=>{
        console.log("error");
      }
    })
    this.toggleEdit()
  }

  handleDelete(){
    this.ss.DeleteName(this.taskModel.id).subscribe({
      next:(res:OutPutModel)=>{
        console.log(res,this.taskModel);

        this.deleted.emit(this.taskModel.id)
      },
      error:(e)=>{
        console.log("error");
      }
    })
  }
}
