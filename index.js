const inquirer = require("inquirer");
const mysql = require("mysql2");
// this just appeared out of nowhere?
const Connection = require("mysql2/typings/mysql/lib/Connection");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "employeeTracker_db",
});

connection.connect(err => {
  if (err) throw err;
  console.log(`Connected to the employeeTracker_db database.`);
  start();
});
