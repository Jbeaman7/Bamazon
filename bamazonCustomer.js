const inquirer = require("inquirer");
const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Besitos7",
    database: "Bamazon"
})

connection.connect(function (error) {
    if (error) throw error;
    console.log("connected" + connection.threadId);
});

function startPrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID of the item you want to purchase.'

        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to purchase?'
        }

    ]).then(function (input) {
        console.log('Customer has selected: \n    item_id = ' + input.item_id + '\n    quantity = ' + input.quantity);
        let item = input.item_id;
        let quantity = input.quantity;
        let queryString = `SELECT * FROM products WHERE item_id = ${item}`;


        connection.query(queryString, function (error, data) {
            if (error) throw error;
            if (data.length === 0) {
                console.log("Invalid Item ID");
                displayInventory();
            } else {
                let productData = data[0];
                if (quantity <= productData.stock_quantity) {
                    console.log("Your order was placed!");
                    let updatedString = `UPDATE products SET stock_quantity = ${(productData.stock_quantity - quantity)} WHERE item_id = ${item}`;
                    connection.query(updatedString, function (error, data) {
                        if (error) throw error;
                        console.log("Thanks! Your total is $" + productData.price * quantity);
                        connection.end();
                    })
                } else {
                    console.log("Sorry, your order can't be placed. That item is currently out of stock");
                    displayInventory();
                }
            }
        })
    });
}
function displayInventory() {
    queryString = 'SELECT * FROM products';
    connection.query(queryString, function (error, data) {
        if (error) throw error;
        console.log("Current Product Inventory: ");
        console.log("__________________________");

        var strOut = '';
        for (var i = 0; i < data.length; i++) {
            strOut = '';
            strOut += 'Item ID: ' + data[i].item_id + '  //  ';
            strOut += 'Product Name: ' + data[i].product_name + '  //  ';
            strOut += 'Department: ' + data[i].department_name + '  //  ';
            strOut += 'Price: $' + data[i].price + '\n';

            console.log(strOut);
        }
        startPrompt();
    })
}

function run() {
    displayInventory();
}

run();

