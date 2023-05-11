const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employeeTracker_db",
});

db.connect(err => {
  if (err) throw err;
  console.log(`Connected to the employeeTracker_db database.`);
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
    case "Exit":
      console.log("Goodbye");
      db.end();
      return;
  }
  userPrompt();
};

const start = () => {
  console.log("Welcome to the Employee Tracker");
  userPrompt();
};

start();

const viewAllDepartments = async () => {
  await db
    .promise()
    .query("SELECT * FROM departments")
    .then(([rows]) => {
      let department = rows;
      console.table(department);
    })
    .then(() => userPrompt())
    .catch(err => {
      throw err;
    });
};

const viewAllRoles = async () => {
  await db
    .promise()
    .query(
      "SELECT roles.id, roles.title, roles.salary, departments.department_name FROM roles LEFT JOIN departments ON roles.department_id = departments.id"
    )
    .then(([rows]) => {
      let roles = rows;
      console.table(roles);
    })
    .then(() => userPrompt())
    .catch(err => {
      throw err;
    });
};

const viewAllEmployees = async () => {
  await db
    .promise()
    .query(
      'SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.department_name AS department, roles.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employee manager ON employee.manager_id = manager.id'
    )
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => userPrompt())
    .catch(err => {
      throw err;
    });
};

const addDepartment = async () => {
  const { departmentName } = await inquirer.prompt({
    type: "input",
    name: "departmentName",
    message: "What is the name of the department?",
    validate: input => {
      if (!input.trim()) {
        return "Department name cannot be empty.";
      }
      return true;
    },
  });
  await db
    .promise()
    .query("INSERT INTO departments (department_name) VALUES (?)", [
      departmentName.trim(),
    ])
    .then(() => {
      console.log("Department added successfully!");
    })
    .then(() => userPrompt())
    .catch(err => {
      throw err;
    });
};

const addRole = async () => {
  const departments = await db.promise().query("SELECT * FROM departments");
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the role?",
    },
    {
      type: "number",
      name: "salary",
      message: "What is the salary of the role?",
      validate: value => {
        if (value < 0) {
          return "Please enter a positive number";
        }
        return true;
      },
    },
    // TODO Not working either
    {
      type: "list",
      name: "departmentId",
      message: "What department does the role belong to?",
      choices: departments.map(({ id, department_name }) => ({
        name: department_name,
        value: id,
      })),
    },
  ]);
  await db
    .promise()
    .query(
      "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, departmentId]
    );
  console.log(`New role ${title} added successfully`);
};

const addEmployee = async () => {
  const roles = await db.promise().query("SELECT id, title FROM roles");
  let managers = [];
  await db
    .promise()
    .query(
      "SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL"
    )
    .then(([rows]) => {
      managers = rows;
    })
    .then(async () => {
      console.log(managers);
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the first name of the employee?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the last name of the employee?",
        },
        {
          type: "list",
          name: "departmentId",
          message: "What is the department?",
          choices: [
            { name: "Nuclear Power Plant", value: 1 },
            { name: "Elementary School", value: 2 },
            { name: "Krusty Burger", value: 3 },
          ],
        },

        // TODO Need help here //
        {
          type: "list",
          name: "managerId",
          message: "Who is the employee's manager?",
          choices: managers.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          })),
        },
      ]);
    });

  await db
    .promise()
    .query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [firstName, lastName, roleId, managerId]
    );
  console.log(`New employee ${firstName} ${lastName} added successfully`);
};
