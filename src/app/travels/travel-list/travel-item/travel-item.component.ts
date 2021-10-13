import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Travel } from '../../travel.model';

@Component({
  selector: 'app-travel-item',
  templateUrl: './travel-item.component.html',
  styleUrls: ['./travel-item.component.css']
})

export class TravelItemComponent implements OnInit {
@Input() travel: Travel;
@Input() index: number;
@Output() travelSelected = new EventEmitter<void>();

ngOnInit(){}

onSelected() {
  this.travelSelected.emit();
}

constructor() { }


}