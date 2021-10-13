import { Component, OnInit } from "@angular/core";
import { Travel } from "./travel.model";
import { TravelService } from "./travel.service";

@Component({
    selector: 'app-travels',
    templateUrl: './travels.component.html',
    styleUrls: ['./travels.component.css'],
    providers: [TravelService]
})

export class TravelsComponent implements OnInit {
selectedTravel: Travel;

constructor() {}

ngOnInit() {}

}