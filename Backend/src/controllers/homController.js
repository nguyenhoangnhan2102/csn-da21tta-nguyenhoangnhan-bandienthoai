
const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService');

const getHompage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('home.ejs', { listUsers: results }); // x <- y
}

const postCreateUser = async (req, res) => {

    //Cách 1:
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;

    //Cách 2:
    // let {email, name, city} = req.body;

    // connection.query(
    //     ` INSERT INTO
    //         Users (email, name, city) 
    //         VALUES (?, ?, ?) `, // Truyền động giá trị
    //     [email, name, city],
    //     function (err, results) {
    //         res.send('Create user succeed!')
    //     }
    // );

    console.log(">>> Email = ", email, ", name = ", name, ", city = ", city);

    let [results, fields] = await connection.query(
        ` INSERT INTO
          Users (email, name, city)
          VALUES (?, ?, ?) `,               // ? == Truyền động giá trị  
        [email, name, city],
    );
    res.redirect('/');

}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id;

    let user = await getUserById(userId);

    res.render('edit.ejs', { userEdit: user }); // x <-- y
}

const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    let userId = req.body.userId;

    await updateUserById(email, name, city, userId);

    res.redirect('/');
    // res.send('Update user succeed!!!');
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id;

    let user = await getUserById(userId);

    res.render('delete.ejs', { userEdit: user });
}

const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId;

    await deleteUserById(id);

    res.redirect('/');
}

module.exports = {
    getHompage, getCreatePage,
    postCreateUser, getUpdatePage, postUpdateUser,
    updateUserById, postDeleteUser, postHandleRemoveUser
}