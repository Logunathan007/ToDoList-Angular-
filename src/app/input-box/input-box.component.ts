import { Component, DoCheck, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StoreService } from '../_services/store.service';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.css'
})
export class InputBoxComponent implements DoCheck{
  formgroup = new FormGroup({
    name : new FormControl('')
  })

  search = "";

  // this.datas.filter((ele:any)=>ele.name.toLowerCase().includes(this.search.toLowerCase()))

  constructor(public ss:StoreService){}

  ngDoCheck(): void {
    this.ss.searchChange(this.search);
  }

  datas:any = []

  ngOnInit(): void {
    this.ss.messageSource.subscribe(message => this.datas = message)
  }

  onAdd(){
    var name:string | null= this.formgroup.controls?.['name']?.value;
    if(name){
      var obj = {
        id : this.datas.length==0?1:this.datas[this.datas.length-1].id + 1 ,
        name : name
      }
      this.datas.push(obj);
      this.ss.Change(this.datas);
    }
    this.formgroup.controls?.['name']?.setValue("")
  }
}
