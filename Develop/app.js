const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//These notes are before- my notes start on line 37
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// This function confirms that only numbers are put into the ID and office ID
// It will let you know that you did not return a number and to please enter one
function confirmNumbers (numberInput)
{
    const numbers = /^[0-9]+$/;
    if (numbers.test(parseInt(numberInput))){
        return numbers.test(parseInt(numberInput));
    }
    else {
        console.log("Please insert numbers only")
    }
};

//This function confirm that only a string in the form of an email is returned
//otherwise you will receive a console.log stating that you need to input the 
//correct format.
function ValidateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (re.test(String(email).toLowerCase())){
       return re.test(String(email).toLowerCase());
    }else{
        console.log("Please enter a valid email")
    }
}
// This array of questions prompts the user to return the data. By setting 
// the question which role are you, i'm able to call on "when" as a prompt in each 
// input type to guide the questions to meet the requirements of the correct 
// role that we are looking to gather information for
const questions = [
    {
        type: "list",
        message: "What role are you?",
        name: "officeRole",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: "input",
        message: "What is your name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your id?",
        name: "id",
        validate: confirmNumbers,
    },
    {
        type: "input",
        message: "What if your email?",
        name: "email",
        validate: ValidateEmail,
    },
    {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber",
        validate: confirmNumbers,
        when: (response) => response.officeRole === "Manager",
    },
    {
        type: "input",
        message: "What school are you from?",
        name: "school",
        when: (response) => response.officeRole === "Intern"
    },
    {
        type: "input",
        message: "What is your github username?",
        name: "github",
        when: (response) => response.officeRole === "Engineer"
    },
    {
        type: "confirm",
        message: "Do you want to add another employee?",
        name: "done",
    }
]

//creating a blank array allows me to collect data for the employees entered
const employees = [];

// this starts the function to ask the questions to the user when they
// open this on the terminal. It then runs the asynchronous call for questionAnswers
const allEmployees = () => {
    inquirer.prompt(questions).then(questionAnswers);
};

//this function is storing the response based off off what the user has inputted
// the last response is different for each employee type
const questionAnswers = (response) => {
    let employee;
    if(response.officeRole === "Manager") {
        employee = new Manager(response.name, response.id, response.email, response.officeNumber);
    }else if(response.officeRole === "Engineer") {
        employee = new Engineer(response.name, response.id, response.email, response.github);
    }else if(response.officeRole === "Intern") {
        employee = new Intern(response.name, response.id, response.email, response.school);
    }
    // this is saving the information of each employee and adding them to the 
    // empty employee array at line 116
    employees.push(employee);

    //Once you confirm that you are done adding employees,
    // I am calling this function to save all the employees
    //this is similar to the init function that we use
    if (response.done) return allEmployees();

    // Instead of keeping my objects (in this case employees created by the user
    // ass in one array that the user sees, I want it to be created on an HTML page)
    // That way it is extremely user friendly. I am creating a new html page under 
    // the Output folder.
    fs.writeFile(outputPath, render(employees), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Yay! Open your Output Folder");
    });
};

// calling the function above to make sure that all employees are 
// returned in the order they were entered and with the correct 
// order of the array and assigned to each variable.
allEmployees();