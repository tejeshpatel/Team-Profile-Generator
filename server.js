const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");  
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "dist")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/renderHTML");

const teamMembers = [];
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Answer the questions below to build the team profiles.");
    inquirer.prompt([
      {
        type: 'input',
        name: 'managerName',
        message: 'What is your name?'
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'What is your ID?'
      },
      {
        type: 'input',
        name: 'managerEmail',
        message: 'What is your email address?',
        default: () => {},
        validate: function (email) {
  
              valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  
              if (valid) {
                  return true;
              } else {
                  console.log("\n Please enter a valid email")
                  return false;
              } }
      },
      {
        type: 'input',
        name: 'managerOfficeNumber',
        message: 'What is your manager office number?'
      }

    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      //questions
      {
        type: 'input',
        name: 'engineerName',
        message: 'What is the engineer name?'
      },
      {
        type: 'input',
        name: 'engineerId',
        message: 'What is the engineer ID?'
      },
      {
        type: 'input',
        name: 'engineerEmail',
        message: 'What is the engineers email address?',
        default: () => {},
        validate: function (email) {
  
              valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  
              if (valid) {
                  return true;
              } else {
                  console.log("\n Please enter a valid email")
                  return false;
              } }
      },
      {
        type: 'input',
        name: 'engineerGithub',
        message: 'What is the engineer GitHub username?'
      },
    ]).then(answers => {
      
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
          
      
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([

      {
        type: 'input',
        name: 'internEmail',
        message: 'What is the interns email address?',
        default: () => {},
        validate: function (email) {
  
              valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  
              if (valid) {
                  return true;
              } else {
                  console.log("\n Please enter a valid email")
                  return false;
              } }
      },
      {
        type: 'input',
        name: 'internSchool',
        message: 'What school does the intern attend?'
      },

    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.intern);
      teamMembers.push(intern);
      idArray.push(answers.internId);
           
      createTeam();
    });
  }

  function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();