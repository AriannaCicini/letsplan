import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Travel } from '../travel.model';
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-travel-detail',
  templateUrl: './travel-detail.component.html',
  styleUrls: ['./travel-detail.component.css']
})

export class TravelDetailComponent implements OnInit {
@Input() travel: Travel;
travels: any
activities: any[] = [];
@Input() index: number;

constructor(private travelService: TravelService,
            private route: ActivatedRoute,
            private router: Router) {}

ngOnInit(){}

onEditTravel() {
  this.router.navigate(['edit'], {relativeTo: this.route});
}

onDeleteTravel(id) {
  console.log(id)
  this.travelService.deleteTravel(id).subscribe(
    data => {console.log(data)
    this.router.navigate(['/travels'], {relativeTo: this.route}).then(() => {
    this.router.navigate(['/travel'], {relativeTo: this.route});
    });
    },
    err => {console.log(err)
    }
  )
}

}
