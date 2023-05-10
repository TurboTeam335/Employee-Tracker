-- SELECT * 
-- FROM departments;

-- SELECT roles.id, roles.title, roles.salary, departments.department_name 
-- FROM roles 
-- LEFT JOIN departments 
-- ON roles.department_id = departments.id;

SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.department_name 
AS department, roles.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager 
FROM employee 
LEFT JOIN roles 
ON employee.role_id = roles.id 
LEFT JOIN departments 
ON roles.department_id = departments.id 
LEFT JOIN employee manager 
ON employee.manager_id = manager.id;