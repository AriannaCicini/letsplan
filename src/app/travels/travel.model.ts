export class Travel {
    public id? : string;
    public name: string;
    public type: string;
    public date: Date;
    public budget: number;
    public activities: any[];
   
  
    constructor(name: string, type: string, date: Date, budget: number, activities: any[]){
        this.name = name;
        this.type = type;
        this.date = date;
        this.budget = budget;
        this.activities = activities; 
    }
  }