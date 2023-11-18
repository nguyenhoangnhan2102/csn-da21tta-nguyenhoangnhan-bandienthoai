require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const webRoute = require('./routes/web');
const connection = require('./config/database');

const app = express();                     //app express
const port = process.env.PORT || 9999;     //port
const hostname = process.env.HOST_NAME;

//Config template engine
configViewEngine(app);

//Khai báo route
app.use('/', webRoute);

// simple query
// connection.query(
//     'SELECT * FROM Users u ',
//     function (err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     }
// );

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
})