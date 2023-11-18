const connection = require('../config/database');

const getHomePage = (req, res) => {
    let users = [];

    connection.query(
        'SELECT * FROM Users u ',
        function (err, results, fields) {
            users = results;
            console.log(">>>Check result: ", results);
            res.send(JSON.stringify(users));
        }
    );

}

const getABC = (req, res) => {
    res.send('Get ABC!!!');
}

const getNHNhan = (req, res) => {
    res.render('sample.ejs');
}

module.exports = {
    getHomePage, getABC, getNHNhan
}