const Users = require("../models/Users")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../db/connection");


// --------------------------------------------------- List User ----------------------------------------------------
exports.listUsers = async (req, res) =>
{
    try
    {
        const list = await Users.findAll()
        // console.table(await list.map(value => value.dataValues));
        res.status(200).send(list);
    }
    catch (error)
    {
        console.log(error)
    }
}

// exports.listUserName = async (req, res) => {
//     try {
//         let userList = await User.find({});
//         if (userList.length > 0){
//             console.log("inside listUsername");
//             let username = [];
//             for(let i = 0; i < userList.length; i++){
//                 username.push(i+1, userList[i].name);
//             };
//             res.status(200).send(username);
//         }
//         else {
//             console.log("Nothing to display");
//             res.status(400).send({error: "request failed"});
//         }
//     } catch (e) {
//         console.log("error in listUsername");
//         res.status(500).send({error:"internal server error"});
//         console.log(e);
//     }
// }
// exports.listUserEmail = async (req, res) => {
//     try {
//         let userList = await User.find({});
//         if (userList.length > 0){
//             console.log("inside listUsername");
//             let user = [];
//             for(let i = 0; i < userList.length; i++){
//                 user.push(i+1, userList[i].email);
//             };
//             res.status(200).send(user);
//         }
//         else {
//             console.log("Nothing to display");
//             res.status(400).send({error: "request failed"});
//         }
//     } catch (e) {
//         console.log("error in listUsername");
//         res.status(500).send({error:"internal server error"});
//         console.log(e);
//     }
// }
// // --------------------------------------------------- Create ----------------------------------------------------
exports.addUser = async (req, res) =>
{
    try
    {

        let newUser = await Users.create(req.body)
        // const newUser = new Users(req.body);
        // const token = await newUser.generateAuthToken();
        // await newUser.save();
        res.status(201).send({ message: "new user added", user: newUser.username });
        // res.status(201).send({ user: newUser.username, token });
    } catch (error)
    {
        if (error.original.errno === 1062)
        {
            res.status(409).send({ error: "already exists!" });
        }
        else
        {
            console.log(error)
            res.status(500).send({ error: "Oops" });
        }
    };
}

exports.login = async (req, res) =>
{
    try
    {
        const user = await Users.findOne({ where: { username: req.body.username } })
        if (user)
        {
            const password_valid = await bcrypt.compare(req.body.password, user.password)
            if (password_valid)
            {
                token = jwt.sign({ "user_id": user.user_id }, process.env.SECRET);
                res.status(200).json({ user: user.username, token: token });
            } else
            {
                res.status(400).json({ error: "Password Incorrect" });
            }
        } else
        {
            res.status(404).json({ error: "User does not exist" });
        }
    } catch (error)
    {
        console.log(error)
        res.status(400).send({ error: error.message });
    }
};

// // ------------------------------------------------- Delete User --------------------------------------------------
exports.deleteUser = async (req, res) =>
{
    try
    {
        if (req.user)
        {
            console.log(`${req.user.username} Account was deleted`);
            // await sequelize.query(
            //     `DELETE FROM Users WHERE user_id = '${req.user.user_id}'`
            //     );
<<<<<<< HEAD
            await Users.destroy({ where : {user_id: req.user.user_id}});
=======
            await Users.destroy({ where: { user_id: req.user.user_id } })
>>>>>>> abd7e7949ac27cc0511cdf192648ca219b5897a7
            res.status(200).send(await Users.findAll());
        }
        else
        {
            console.log("Nothing to delete");
            res.status(400).send({ error: "request failed" });
        }
    } catch (e)
    {
        console.log("error in deleteUser");
        res.status(500).send({ error: "internal server error" });
        console.log(e);
    }
};
// // -------------------------------------------------- Edit User --------------------------------------------------
exports.editUsername = async (req, res) => {
    try{
        if(req.user && req.body.username) {
            await Users.update({ username: req.body.username }, {
                where: {
                    user_id: req.user.user_id
                }
            });
            res.status(200).send(await Users.findOne( { where:{username: req.body.username} }));
        } else if (!req.body.username) {
            res.status(400).send({error: `use the "username" key`});
        }
    } catch (error) {
            res.status(500).send(console.log("Failed to update users name"));
            console.log(error);
    }
};

exports.editEmail = async (req, res) => {
    try{
        if(req.user && req.body.email) {
             await Users.update({ email: req.body.email }, {
                where: {
                  user_id: req.user.user_id
                }
            });
            res.status(200).send(await Users.findOne({where: {email: req.body.email}}));
        } else if (!req.body.email){
            res.status(400).send({error: `use the "email" key`});
        }
    } catch (error) {
            res.status(500).send(console.log("Failed to update users email"));
            console.log(error);
        }
};

exports.editPassword = async (req, res) => {
    try{
        if(req.user && req.body.password) {
            await Users.update({ password: req.body.password }, {
                where: {
                  user_id: req.user.user_id
                }
            });
            res.status(200).send(await Users.findOne({where: {password: req.body.password}}));
        } else if (!req.body.password){
            res.status(400).send({error: `use the "password" key`});
        }
    } catch (error) {
        res.status(500).send(console.log("Failed to update password"));
        console.log(error);
    }
};
exports.editPhone = async (req, res) => {
    try{
        if(req.user && req.body.phone) {
            await Users.update({ phone: req.body.phone }, {
                where: {
                  user_id: req.user.user_id
                }
            });
            res.status(200).send(await Users.findOne({where: {phone: req.body.phone}}));
        } else if (!req.body.phone){
            res.status(400).send({error: `use the "phone" key`});
        }
    } catch (error) {
        res.status(500).send(console.log("Failed to update phonenumber"));
        console.log(error);
    }
};
