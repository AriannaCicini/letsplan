import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Travel } from '../travel.model';
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit {
travels: Travel[];
@Output() travelWasSelected = new EventEmitter<Travel>();

constructor(private travelService: TravelService,
            private route: ActivatedRoute,
            private router: Router) {}

ngOnInit(){
  this.travelService.getTravels().subscribe(
    data => {
      console.log(data);
      this.travels = data
    },
    err => {console.log(err)}
  )
}

onNewTravel() {
  this.router.navigate(['new'], {relativeTo: this.route});
}

onTravelSelected(travel: Travel) {
  this.travelWasSelected.emit(travel);
}

}
