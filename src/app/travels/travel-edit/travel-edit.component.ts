import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Travel } from '../travel.model';
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-travel-edit',
  templateUrl: './travel-edit.component.html',
  styleUrls: ['./travel-edit.component.css']
})
export class TravelEditComponent implements OnInit{
  activityName: string = '';
  name: string = '';
  type: string = '';
  date: Date = null;
  budget: number = null;
  activities: any[] = [];
  travels: any[] = [];
  id: string;
  @Input() travel: Travel;
  index: number;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private travelService: TravelService) {}
  
  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id)
    })
       
   }   

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
              
  onUpdate(id){
    let travel = {
       name: this.name,
       type: this.type,
       date: this.date,
       budget: this.budget,
       activities: this.activities
       }
       this.name = this.travel.name;
       this.type = this.travel.type;
       this.date = this.travel.date;
       this.budget = this.travel.budget;
       this.activities = this.travel.activities;
      console.log(id)
      this.travelService.updateTravel(id, travel).subscribe(
      data => {console.log(data);
      this.router.navigate(['/travel'], {relativeTo: this.route});
      },
        err => {console.log(err)}
      )
  }
  

}
