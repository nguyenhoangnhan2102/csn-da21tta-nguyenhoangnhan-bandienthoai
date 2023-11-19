const connection = require('../config/database');

const getHomePage = (req, res) => {
    return res.render('home.ejs');
}

const postCreateUser = async (req, res) => {
    // let email = req.body.email;
    // let name = req.body.myname;
    // let city = req.body.city;

    let { email, name, city } = req.body;

    let [results, fields] = await connection.query(
        `INSERT INTO Users (email, name, city) VALUES(?, ?, ?)`, [email, name, city]
    );

    res.send("Created a new user succeed!!!");

    res.redirect('/');
}

const getCreatePage = (req, res) => {
    res.render("create.ejs")
}

module.exports = {
    getHomePage, postCreateUser, getCreatePage
}