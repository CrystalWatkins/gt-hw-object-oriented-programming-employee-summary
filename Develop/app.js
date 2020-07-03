const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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

function confirmNumbers (numberInput)
{
    const numbers = /^[0-9]+$/;
    return numbers.test(parseInt(numberInput));
};

function ValidateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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


const employees = [];

const allEmployees = () => {
    inquirer.prompt(questions).then(questionAnswers);
};

const questionAnswers = (response) => {
    let employee;
    if(response.officeRole === "Manager") {
        employee = new Manager(response.name, response.id, response.email, response.officeNumber);
    }else if(response.officeRole === "Engineer") {
        employee = new Engineer(response.name, response.id, response.email, response.github);
    }else if(response.officeRole === "Intern") {
        employee = new Intern(response.name, response.id, response.email, response.school);
    }

    employees.push(employee);

    if (response.done) return allEmployees();

    fs.writeFile(outputPath, render(employees), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Yay! Open your Output Folder");
    });
};


allEmployees();