// TODO: Write code to define and export the Employee class
//This is the employee class. Since it is using elements that all of the 
//other classes use, it is the parent element in this case
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName(){
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail(){
        return this.email
    }
    getRole() {
        return "Employee";
    }
}

module.exports = Employee;
