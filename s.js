var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});
connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    purchase()
};

function purchase() {
    connection.query("SELECT * FROM bamazon", function(err, results) {
        if (err) throw err;
        inquirer.prompt([{
            type: "list",
            name: "choice",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].item);
                }
                return choiceArray;
            },
            message: "What item would you like to buy?"
        }, {
            name: "purchase",
            type: "input",
            message: "How many would you like to buy?"
        }]).then(function(answer) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item === answer.choice) {
                    chosenItem = results[i];
                }
            }

           
           
             function check() {if (connection.stock===0 || connection.stock > answer.purchase){
                    console.log("Sorry we are out of this product")
                }
            
            else{
            connection.query("UPDATE bamazon SET stock = ? WHERE ?", [{
                stock:answer.purchase - 1,},
               { id: chosenItem.id
            }]) 

            
        }
    }
              
                check()
                inquirer.prompt([{
                    type:'list',
                    name:'again',
                    message:'would you like to keep shopping?',
                    choices:["y","n"]

                }])

                .then(function(answer) {
                console.log(answer.again)
                if (answer.again==="y"){
                start();
            }
            else if (answer.again==="n"){console.log("goodbye")}
       
            
            
         
        })
    })
    })}