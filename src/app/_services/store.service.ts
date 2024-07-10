import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  datas:any = [
    {
      id : 1,
      name : "workout"
    },{
      id : 2,
      name : "study"
    },{
      id : 3,
      name : "eat"
    },{
      id : 4,
      name : "angular"
    }
  ]

  datas_copy = []

  public messageSource = new BehaviorSubject(this.datas);

  public searchSourcce = new BehaviorSubject("");

  searchChange(message:string=""){
    this.datas_copy = this.datas.filter((ele:any)=>ele.name.toLowerCase().includes(message.toLowerCase()))
    this.messageSource.next(this.datas_copy)
  }

  Change(message: any) {
    this.messageSource.next(message)
    this.datas = message;
  }
  constructor() { }
}
