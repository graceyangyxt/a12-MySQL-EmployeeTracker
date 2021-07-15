const mysql = require ('mysql')
const inquirer = require('inquirer')
const pass = require('./config')

const connection = 
mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password: pass,
    database: 'employee_tracker_db',
});

connection.connect((err)=>{
    if(err)throw err;
    loadTracker()
});

function addDepartment(){
    inquirer.prompt([
        {
            type:"input",
            name:"departmentName",
            message:"Please add your new department:)"
        }
    ])
    .then(answer=>{
        connection.query(`INSERT INTO department (name)
        VALUES ("${answer.departmentName}");`,
        (err,res)=>{ 
            if (err) throw err;
            console.log("Department has been added!")
            loadTracker()
        }
        )
    })
}
function addRole(){
    connection.query("SELECT * FROM department",(err,res)=>{
        var departmentChoices = res.map(department=>({
            value:department.id,
            name: department.name,
        }))
       inquirer.prompt([
           {
               type:"input",
               name:"title",
               message:"What is your new role?"
           },
            {
                type:"input",
                name:"salary",
                message:"What is the salary of your new role?"
            },
            {
                type:"list",
                name:"department",
                choices: departmentChoices,
                message:"What is the department of your new role belong to?"
            },
       ])
       .then(answer=>{
           connection.query(`INSERT INTO role (title,salary,department_id)
           VALUES ("${answer.title}",${answer.salary}, ${answer.department});`,err=>{
            if (err) throw err;
            console.log("New role has been created!")
            loadTracker()
           })
       })
    })
}
function addEmployee(){
    connection.query("SELECT * FROM role",(err,res)=>{
        var roleChoices = res.map(role=>({
            value:role.id,
            name: role.title,
        }))  
        connection.query("SELECT * FROM employee",(err,res)=>{
            var employeeChoices = res.map(employee=>({
                value:employee.id,
                name: employee.first_name + ' ' + employee.last_name,
            }))  
            // "this is for employee without a manager
            employeeChoices.push({value:null, name:"NONE"});
        
            inquirer.prompt([
                {
                    type:"input",
                    name:"firstName",
                    message:"What is your first name?"
                },
                {
                    type:"input",
                    name:"lastName",
                    message:"What is your last name?"
                },
                {
                    type:"list",
                    name:"role",
                    choices:roleChoices,
                    message:"What is the role of this employee?"
                },
                {
                    type:"list",
                    name:"employee",
                    choices:employeeChoices,
                    message:"What is the manager?"
                },
            ])
            .then(answer=>{
                connection.query(`INSERT INTO employee (first_name, last_name,role_id,manager_id)
                VALUES ("${answer.firstName}", "${answer.lastName}",${answer.role},${answer.employee});`,err=>{
                    if (err) throw err;
                    console.log("Employee created!")
                    loadTracker()
                })
            })
        } ) 
    })
}
function updateEmployee(){
    connection.query("SELECT * FROM employee",(err,res)=>{
        if (err) throw err;
        var employee = res.map(employee=>({
            value:employee.id,
            name: employee.first_name + ' '+ employee.last_name,
        }))
        connection.query("SELECT * FROM role",(err,res)=>{
            if (err) throw err;
            var role = res.map(role=>({
                value:role.id,
                name:role.title,
            }))

            inquirer.prompt([
                {
                    type:"list",
                    name:"employee",
                    choices:employee,
                    message:"What employee do you want to update?"
                },
                {
                    type:"list",
                    name:"role",
                    choices:role,
                    message:"What is the role?"
                }
            ])
            .then(answer=>{
                connection.query(`UPDATE employee SET ? WHERE ?`,[{manager_id:answer.employee},{role_id:answer.role}],
                err=>{
                    if (err) throw err;
                    console.log("Employee role updated!")
                    loadTracker()
            })
        })
    })
})
}
function loadTracker(){
    inquirer.prompt([
        {
            type:"list",
            name: "main",
            choices:["View All Employees","View All Roles","View All Departments","Add Department","Add Role","Add Employee","Update Employee Roles"],
            message: "What would you like to do?"
        }
    ])
    .then(answer=>{
        switch(answer.main){
            case "View All Employees":
                connection.query(`SELECT * FROM employee`,
                // [answer.first_name,answer.last_name],
                (err,res)=>{ 
                    if (err) throw err;
                    console.table(res)
                    // res.forEach(element => console.log(`${element.first_name}`+` `+`${element.last_name}`));
                    loadTracker()
                })
                break; 
            case "View All Roles":
                connection.query(`SELECT * FROM role`,
                // [answer.title],
                (err,res)=>{ 
                    if (err) throw err;
                    console.table(res)
                    loadTracker()}
                )
                break;
            case "View All Departments":
                connection.query(`SELECT * FROM department`,
                // [answer.title],
                (err,res)=>{ 
                    if (err) throw err;
                    console.table(res)
                    loadTracker()}
                )
                break;
            case "Add Department":
                addDepartment();
                break;  
            case "Add Role":
                addRole();
                break;   
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Roles":
                updateEmployee();
                break;  
        }
    })
}