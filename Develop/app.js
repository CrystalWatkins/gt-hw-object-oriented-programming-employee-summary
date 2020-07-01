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

const questions = [
    {
        type: "input",
        message: "What is your name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email",
    },
    {
        type: "input",
        message: "What if your id?",
        name: "id?",
    },
    {
        type: "list",
        message: "What role are you?",
        name: "officeRole",
        choices: ["manager", "engineer", "intern"]
    },
]

let informationCollected 

inquirer.prompt(questions).then(function(data){
informationCollected = data
if (questions.choices === "manager") {
    officeNumber().then(function(data){
        console.log(data)
        informationCollected.officeNumber = data.officeNumber
        console.log(informationCollected)
    })
}if (questions.choices = "engineer") {
    github().then(function(data){
        console.log(data)
        informationCollected.github = data.officeNumber
        console.log(informationCollected)
    })
}if (questions.choices = "intern") {
    school().then(function(data){
        console.log(data)
        informationCollected.school = data.officeNumber
        console.log(informationCollected)
    })
}
  
    // run final question add another?
    // create html use writeFile method 
    // fs.writeFile("type", "name", cb)

// lastQuestion();
})



function officeNumber(){
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber",
        }
    ])
}
function school(){
    return inquirer.prompt([
        {
            type: "input",
            message: "What school are you from?",
            name: "school",
        }
    ])
}
function github(){
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your github username?",
            name: "github",
        }
    ])
}


// function lastQuestion(){
//     return inquirer.prompt([
//     {
//         type: "confirm",
//         massage: "Do you want to add another employee?",
//         name: "exit"
//     }
//     ])
// }