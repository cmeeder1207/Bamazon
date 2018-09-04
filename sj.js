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
connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    manage()
};

    function manage(){
        inquirer.prompt([{
            type:"list",
            name:"menu",
            message:"Hello NEW MANAGER NAME HERE. What would you like to do today?",
            choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
        }])

        .then(function(answer){
            if(answer.menu==="View Products for Sale"){
                view()
            }

            if(answer.menu==="View Low Inventory"){
                low()
            }
            if(answer.menu==="Add to Inventory"){
            add()
            }
            if(answer.menu==="Add New Product"){
            addnew()
            }
        })
                function view(){
                    var sql="SELECT * FROM bamazon";
                
                    connection.query(sql, function(err,data){
                        if(err) throw err;

                        if (data){
                            var sqlout = '';
                            for (let i = 0; i < data.length; i++) {
                                sqlOut = '';
                                sqlOut += 'Item ID: ' + data[i].item_id + '  //  ';
                                sqlOut += 'Product Name: ' + data[i].product_name + '  //  ';
                                sqlOut += 'Department: ' + data[i].catagory_name + '  //  ';
                                sqlOut += 'Price: $' + data[i].price + '  //  ';
                                sqlOut += 'Quantity: ' + data[i].stock + '\n';
                    
                                console.log(sqlout)
                            }
                            connection.end()
                            start()
                        }

                    })
                }

                        function low(){
                           
                            queryStr = 'SELECT * FROM bamazon WHERE stock < 5';

                          
                            connection.query(queryStr, function(err, data) {
                                if (err) throw err;
                        
                              
                        
                                var strOut = '';
                                for (var i = 0; i < data.length; i++) {
                                    strOut = '';
                                    strOut += 'ID: ' + data[i].id + '  //  ';
                                    strOut += 'item: ' + data[i].item + '  //  ';
                                    strOut += 'Catagory: ' + data[i].catagory + '  //  ';
                                    strOut += 'Price: $' + data[i].price + '  //  ';
                                    strOut += 'Quantity: ' + data[i].stock + '\n';
                        
                                    console.log(Table.print(strOut))
                                }
                        
                                  console.log("---------------------------------------------------------------------\n");
                        
                                start()
                            })
                        }

                            function low(){
                                connection.query("SELECT * FROM bamazon WHERE stock > 5", function(err, results) {
                                    if (err) throw err;
                                           
                                            var choiceArray = [];
                                            for (var i = 0; i < results.length; i++) {
                                                choiceArray.push(results[i].item);
                                                console.log(choiceArray)
                                            }
                                              
                                            return choiceArray;
                                           
                                        },
                                       
                                  
                                )}


                            

                                    
                                



                                function add(){
                              
                                        connection.query("SELECT * FROM bamazon ", function(err, results) {
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
                                                message: "What item would you like to add?"
                                            }, {
                                                name: "purchase",
                                                type: "input",
                                                message: "How many would you like to add?"
                                            }]).then(function(answer) {
                                                var chosenItem;
                                                for (var i = 0; i < results.length; i++) {
                                                    if (results[i].item === answer.choice) {
                                                        chosenItem = results[i];
                                                    }
                                                }
                                    
                                               
                                               
                                                connection.query("UPDATE bamazon SET stock = ? WHERE ?", [{
                                                    stock:answer.purchase + answer.input},
                                                   { id: chosenItem.id
                                                }]) 
                                                console.log('Stock count for ' + input+ ' has been updated to ' + (productData.stock_quantity))
                                }
                            )}
                        )}
                    }
                

    