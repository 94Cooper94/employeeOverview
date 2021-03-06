var util = require("util");
var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.MY_PASSWORD,
  database: "employeeoverview"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

connection.query = util.promisify(connection.query);

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "employeeselection",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add departments", 'Add roles', 'Add employees', "View departments", "View roles", "View employees", "Update employee roles", "Exit"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      switch (answer.employeeselection) {
        case "Add departments":
          addDepts();
          break;
        case "Add roles":
          addRoles();
          break;
        case "Add employees":
          addEmployees();
          break;
        case "View departments":
          viewDepts();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewDEmployees();
          break;
        default:
          connection.end();
      }
      // okay so how will i add the addRoles and addEmployees here??
    });
}

// function to handle posting new items up for auction
function addDepts() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "What is the department name?"
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO departments SET ?",
        {
          departmentName: answer.deptName,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function addRoles() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "roleName",
        type: "input",
        message: "What is the role?"
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO roles SET ?",
        {
          role: answer.roleName,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function addEmployees() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "employeeName",
        type: "input",
        message: "What is the department name?"
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employees SET ?",
        {
          employee: answer.employeeName,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function viewDepts() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM departments", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
      console.table(results)
      start();
  });
}

function viewRoles() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
      console.table(results)
      start();
  });
}

function viewEmployees() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM employees", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
      console.table(results)
      start();
  });
}
