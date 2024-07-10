import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StoreService } from '../_services/store.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent implements OnChanges{
  @Input('name')
  name = ""

  @Input('id')
  id = 0

  editName = ""

  ngOnChanges(changes: SimpleChanges): void {
    this.editName = this.name;
  }

  isEditClicked = true;
  toggleEdit(){
    this.isEditClicked = !this.isEditClicked;
  }

  saveValue(){
    if(this.editName === "")return;
    this.datas.forEach((element:any) => {
      if(element.id == this.id){
        element.name = this.editName;
      }
    });
    this.ss.Change(this.datas);
    this.toggleEdit()
  }

  constructor(public ss:StoreService){}

  datas:any = []

  ngOnInit(): void {
    this.ss.messageSource.subscribe(message => this.datas = message)
  }

  handleDelete(){
    this.ss.Change(this.datas.filter((ele:any)=>ele.id!==this.id))
  }
}
