USE employee_tracker_db;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"),("Finance"),("Legal");

INSERT INTO role (title,salary,department_id)
VALUES ("Sales Lead", 100000, 1 );

INSERT INTO role (title,salary,department_id)
VALUES ("Sales Person", 80000, 1 );

INSERT INTO role (title,salary,department_id)
VALUES ("Lead Engineer", 150000, 2 );

INSERT INTO role (title,salary,department_id)
VALUES ("Software Engineer", 120000, 2 );

INSERT INTO role (title,salary,department_id)
VALUES ("Accountant", 125000, 3 );

INSERT INTO role (title,salary,department_id)
VALUES ("Legal Team Lead", 250000, 4 );

INSERT INTO role (title,salary,department_id)
VALUES ("Lawyer", 190000, 4 );


INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES ("John", "Doe",1,3),("Mike", "Chan",2,1),("Ashley", "Rodriguez",3,null),("Kevin", "Tupik",4,3),("Malia", "Brown",5,null),("Sarah", "Lourd",6,null),("Tom", "Allen",7,7);
