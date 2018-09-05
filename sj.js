var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table')



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    manage()
};

function manage() {
    inquirer.prompt([{
            type: "list",
            name: "menu",
            message: "Hello NEW MANAGER NAME HERE. What would you like to do today?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }])

        .then(function (answer) {
            if (answer.menu === "View Products for Sale") {
                view()
            }

            if (answer.menu === "View Low Inventory") {
                low()
            }
            if (answer.menu === "Add to Inventory") {
                add()
            }
            if (answer.menu === "Add New Product") {
                addnew()
            }
        })

    function view() {
        var sql = "SELECT * FROM bamazon";

        connection.query(sql, function (err, data) {
            if (err) throw err;

            if (data) {
                var t = new Table
                data.forEach(function (bamazon) {
                    t.cell(' Id', bamazon.id)
                    t.cell('Description', bamazon.item)
                    t.cell('Price, USD', bamazon.catagory)
                    t.cell('Price, USD', bamazon.price, Table.number(2))
                    t.cell('Stock', bamazon.stock)
                    t.newRow()
                })

                console.log(t.toString())

                start()
            }

        })
    }

    function low() {

        queryStr = 'SELECT * FROM bamazon WHERE stock < 5';


        connection.query(queryStr, function (err, data) {
            if (err) throw err;
            var t = new Table

            data.forEach(function (bamazon) {
                t.cell(' Id', bamazon.id)
                t.cell('Description', bamazon.item)
                t.cell('Price, USD', bamazon.catagory)
                t.cell('Price, USD', bamazon.price, Table.number(2))
                t.cell('Stock', bamazon.stock, Table.number(2))
                t.newRow()
            })

            console.log(t.toString())
            console.log("---------------------------------------------------------------------\n");

            start()
        })
    }





    function add() {

        connection.query("SELECT * FROM bamazon ", function (err, results) {
            if (err) throw err;
            inquirer.prompt([{
                type: "list",
                name: "choice",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].item);
                    }
                    return choiceArray;
                },
                message: "What item would you like to add?"
            }, {
                name: "purchase",
                type: "input",
                message: "How many would you like to add?"
            }]).then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item === answer.choice) {
                        chosenItem = results[i];
                    }
                }



                connection.query("UPDATE bamazon SET ? WHERE ?", [{
                            stock: +answer.purchase
                        },
                        {
                            id: chosenItem.id
                        }
                    ],
                    console.log('Stock count for ' + chosenItem.item + ' has been updated to ' + (chosenItem.stock)))
            })
        })
        start()
    }




    function addnew() {

        inquirer.prompt([{
            type: "prompt",
            name: "name",
            message: "What Product Would You Like To Add? (Name)"
        },
        {
            type: "prompt",
            name: "catagory",
            message: "What Products Catagory"},
            {
                type: "prompt",
                name: "price",
                message: "What Products Price"},
                {
                    type: "prompt",
                    name: "stock",
                    message: "How many do we have in Stock"

        }]).then(function (answer) {
            
                connection.query(`INSERT INTO bamazon (item,catagory,price,stock) VALUES ('${answer.name}'  ,  '${answer.catagory}'  ,  '${answer.price}'  ,  '${answer.stock}'  )`)


                var sql = "SELECT * FROM bamazon";

                connection.query(sql, function (err, data) {
                    if (err) throw err;

                    if (data) {
                        var t = new Table
                        data.forEach(function (bamazon) {
                            t.cell(' Id', bamazon.id),
                                t.cell('Description', bamazon.item),
                                t.cell('Price, USD', bamazon.catagory),
                                t.cell('Price, USD', bamazon.price, Table.number(2)),
                                t.cell('Stock', bamazon.stock),
                                t.newRow()
                        })

                        console.log(t.toString())

                        start()
                    }

                })
            },



        )
    }


}