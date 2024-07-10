import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { StoreService } from '../_services/store.service';

@Component({
  selector: 'app-output-box',
  templateUrl: './output-box.component.html',
  styleUrl: './output-box.component.css'
})

export class OutputBoxComponent implements OnInit{

  constructor(public ss: StoreService) { }

  datas:any = []




  ngOnInit(): void {
    this.ss.messageSource.subscribe(message => this.datas = message)
  }
}
