import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Travel } from "./travel.model";

@Injectable()
export class TravelService {
id: number;
travels: any[];
travel: Travel;
startedEditing = new Subject<number>();
  
constructor(private http: HttpClient){}


getTravels(){
  return this.http.get('https://lets--plan-default-rtdb.firebaseio.com/travels.json').pipe(map(
    travels => {
      console.log(travels)
      return Object.keys(travels).map(
        k => { return {...travels[k], id: k}}
      )
    }
  )
  )
}

getTravel(index: any) {
  return this.http.get('https://lets--plan-default-rtdb.firebaseio.com/travels/' + index + '.json')
}

addTravel(travel: Travel) {
  return this.http.post('https://lets--plan-default-rtdb.firebaseio.com/travels.json', travel)
}

updateTravel(index: any, travel: Travel) {
  return this.http.put('https://lets--plan-default-rtdb.firebaseio.com/travels/' + index + '.json', travel)
}
  
deleteTravel(index: any) {
  return this.http.delete('https://lets--plan-default-rtdb.firebaseio.com/travels/' + index + '.json')
}

}