-- Insert departments
INSERT INTO departments (department_name)
VALUES 
    ('Nuclear Power Plant'),
    ('Elementary School'),
    ('Krusty Burger');

-- Insert roles
INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Safety Inspector', 95000, 1),
    ('Plant Worker', 75000, 1),
    ('Teacher', 35000, 2),
    ('Principal', 120000, 2),
    ('Cook', 38000, 3),
    ('Cashier', 42000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Homer', 'Simpson', 1, 1),
    ('Lenny', 'Leonard', 2, 1),
    ('Carl', 'Carlson', 2, 1),
    ('Marge', 'Simpson', 4, 1),
    ('Bart', 'Simpson', 3, 4),
    ('Lisa', 'Simpson', 3, 4),
    ('Seymour', 'Skinner', 4, 4),
    ('Edna', 'Krabappel', 3, 4),
    ('Krusty', 'the Clown', 5, 5),
    ('Sideshow', 'Mel', 5, 5),
    ('Moe', 'Szyslak', 6, 5),
    ('Barney', 'Gumble', 6, 5),
    ('Ned', 'Flanders', 1, 1),
    ('Maude', 'Flanders', 2, 1),
    ('Rod', 'Flanders', 3, 13),
    ('Todd', 'Flanders', 3, 13),
    ('Milhouse', 'Van Houten', 3, 4),
    ('Martin', 'Prince', 3, 4);
