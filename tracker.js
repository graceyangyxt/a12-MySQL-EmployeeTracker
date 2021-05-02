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

function loadTracker(){
    inquirer.prompt([
        {
            type:"list",
            name: "main",
            choices:["View All Employees","View All Employees By Department","View All Roles","Add Department","Add Role","Add Employee","Remove Employee","Update Employee Roles"],
            message: "What would you like to do?"
        }
    ])
    .then(answer=>{
        switch(answer.main){
            case "View All Employees":
                connection.query(`SELECT * FROM employee`,
                [answer.first_name,answer.last_name],
                (err,res)=>{ 
                    if (err) throw err;
                    console.log(res.first_name)
                    loadTracker()
                })
                break;
            case "View All Employees By Department":

                break;   
            case "View All Roles":
                connection.query(`SELECT * FROM role`,
                [answer.title],
                (err)=>{ if (err) throw err;
                    loadTracker()}
                )
                break;
            case "Add Department":
                connection.query('INSERT INTO department (name)'
                [answer.name],
                (err)=>{ if (err) throw err;
                    loadTracker()}
                )
                break;  
            case "Add Role":
                connection.query('INSERT INTO role (title, salary, department_id)'
                [answer.title,answer.salary,answer.department_id],
                (err)=>{ if (err) throw err;
                    loadTracker()}
                )
                break;   
            case "Add Employee":
    
                break;
            case "Remove Employee":
        
                break;  
            case "Update Employee Roles":
        
                break;  
        }
    })
}