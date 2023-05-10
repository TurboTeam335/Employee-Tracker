const inquirer = require("inquirer");
const mysql = require("mysql2");
// this just appeared out of nowhere?
//const Connection = require("mysql2/typings/mysql/lib/Connection");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employeeTracker_db",
});

connection.connect(err => {
  if (err) throw err;
  console.log(`Connected to the employeeTracker_db database.`);
  start();
});

const userPrompt = async () => {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit",
    ],
  });
  switch (action) {
    case "View all departments":
      await viewAllDepartments();
      break;
    case "View all roles":
      await viewAllRoles();
      break;
    case "View all employees":
      await viewAllEmployees();
      break;
    case "Add a department":
      await addDepartment();
      break;
    case "Add a role":
      await addRole();
      break;
    case "Add an employee":
      await addEmployee();
      break;
    case "Update an employee role":
      await updateEmployeeRole();
      break;
    case "Exit":
      connection.end();
      return;
  }
};

  userPrompt();
const viewAllDepartments = async () => {
  const [rows] = await connection.query("SELECT * FROM departments");
  console.table(rows);
};

const viewAllRoles = async () => {
  const [rows] = await connection.query(
    "SELECT roles.id, roles.title, roles.salary, departments.department_name FROM roles LEFT JOIN departments ON roles.department_id = departments.id"
  );
  console.table(rows);
};

const viewAllEmployees = async () => {
  const [rows] = await connection.query(
    'SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.department_name AS department, roles.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employee manager ON employee.manager_id = manager.id'
  );
  console.table(rows);
};

const addDepartment = async () => {
  const { departmentName } = await inquirer.prompt({
    type: "input",
    name: "departmentName",
    message: "What is the name of the department?",
  });
  await connection.query(
    "INSERT INTO departments (department_name) VALUES (?)",
    [departmentName]
  );
};
