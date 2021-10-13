import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-travel-new',
  templateUrl: './travel-new.component.html',
  styleUrls: ['./travel-new.component.css']
})
export class TravelNewComponent implements OnInit{
  activityName: string = '';
  name: string = '';
  type: string = '';
  date: Date = null;
  budget: number = null;
  activities: any[] = [];
  travels: any[] = [];
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private travelService: TravelService) {}
  
  ngOnInit(): void {}
              
  onSubmit() {
    let an = {
      name : this.activityName
      }
        this.activities.push(an);
        this.activityName = "";         
  }
               
  deleteActivity(index : number) {
    this.activities.splice(index,1)
  }
              
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }
              
  onAdd(){
    let travel = {
      name: this.name,
      type: this.type,
      date: this.date,
      budget: this.budget,
      activities: this.activities
      }
      this.name = "";
      this.type = "";
      this.date = null;
      this.budget = null;
      this.activities = [this.activityName];
      this.travelService.addTravel(travel).subscribe(
      data => {console.log(data);
      this.router.navigate(['/travel'], {relativeTo: this.route});
      },
      err => {console.log(err)}
    )
  }
  

}
