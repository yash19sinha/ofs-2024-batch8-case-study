// this can be imported in another file

export class Employee {
    constructor(id, name, salary){
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
    display(){
        console.log(`ID= ${this.id},Name= ${this.name}, Salary= ${this.salary}`);
        
    }
    toJson() {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            salary: this.salary
        }, null);
    }

}