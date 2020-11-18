const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employeeArray = [];

const render = require("./lib/htmlRenderer");

function init() {
    askMember();
}

init();

function askMember() {
    const OUTPUT_DIR = path.resolve(__dirname, "output");
    const outputPath = path.join(OUTPUT_DIR, "team.html");

    const continueQuestion = [
        {
            type: "input",
            message: "Would you like to add a team member?",
            name: "continueCheck",
        },
    ];
    inquirer.prompt(continueQuestion).then((res) => {
        let upperCheck = res.continueCheck.toUpperCase();
        switch (upperCheck) {
            case "Y":
            case "YES":
                memberType();
                break;
            case "N":
            case "NO":
                dirExists(outputPath);
                fileExists(outputPath);
                writeHtml(outputPath, render(employeeArray));
                console.log(
                    "Please check the output directory for your html file."
                );
                break;
            default:
                console.log(
                    "That was not a valid input. Please enter 'n' for 'no' or 'y' for 'yes'."
                );
                askMember();
        }
    });
}
function dirExists(dirPath) {
    var dirname = path.dirname(dirPath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    fs.mkdirSync(dirname);
}

function fileExists(filePath) {
    var fileName = path.basename(filePath);
    if (fs.existsSync(fileName)) {
        return true;
    }
    fs.writeFileSync(filePath, "");
}

function writeHtml(filePath, data) {
    return fs.writeFileSync(filePath, data);
}

function memberType() {
    const questions = [
        {
            type: "input",
            message: "What type of team member would you like to add?",
            name: "teamMemberType",
        },
    ];
    inquirer.prompt(questions).then((res) => {
        let upperRes = res.teamMemberType.toUpperCase();
        switch (upperRes) {
            case "INTERN":
                intern();
                break;
            case "MANAGER":
                manager();
                break;
            case "ENGINEER":
                engineer();
                break;
            default:
                console.log(
                    "That was not a valid input. Please enter intern, manager, or engineer."
                );
                memberType();
        }
    });
}

function intern() {
    const questions = [
        {
            type: "input",
            message: "What is the intern's name?",
            name: "internName",
        },
        {
            type: "input",
            message: "What is the intern's id?",
            name: "internId",
        },
        {
            type: "input",
            message: "What is the intern's email?",
            name: "internEmail",
        },
        {
            type: "input",
            message: "What is the intern's current school?",
            name: "internSchool",
        },
    ];
    inquirer.prompt(questions).then((res) => {
        const person = new Intern(
            res.internName,
            res.internId,
            res.internEmail,
            res.internSchool
        );
        employeeArray.push(person);
        console.log("A intern has been added!");
        askMember();
    });
}
function manager() {
    const questions = [
        {
            type: "input",
            message: "What is the manager's name?",
            name: "managerName",
        },
        {
            type: "input",
            message: "What is the manager's id?",
            name: "managerId",
        },
        {
            type: "input",
            message: "What is the manager's email?",
            name: "managerEmail",
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "managerOffice",
        },
    ];
    inquirer.prompt(questions).then((res) => {
        const person = new Manager(
            res.managerName,
            res.managerId,
            res.managerEmail,
            res.managerOffice
        );
        employeeArray.push(person);
        console.log("A manager has been added!");
        askMember();
    });
}
function engineer() {
    const questions = [
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "engineerName",
        },
        {
            type: "input",
            message: "What is the engineer's id?",
            name: "engineerId",
        },
        {
            type: "input",
            message: "What is the engineer's email?",
            name: "engineerEmail",
        },
        {
            type: "input",
            message: "What is the engineer's github username?",
            name: "engineerGithub",
        },
    ];
    inquirer.prompt(questions).then((res) => {
        const person = new Engineer(
            res.engineerName,
            res.engineerId,
            res.engineerEmail,
            res.engineerGithub
        );
        employeeArray.push(person);
        console.log("A engineer has been added!");
        askMember();
    });
}

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
