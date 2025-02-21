const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    //write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validUsers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });

    if(validUsers.length > 0) {
        return true;
    } else{
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    let username, password;
    if(req.body){
        username = req.body.username;
        password = req.body.password;
    }
    if(!username || !password) {
        username = req.query.username;
        password = req.query.password;
    }

    if(!username || !password) {
        return res.status(404).json({ message: "Please provide a username and password."});
    }

    if(authenticatedUser(username, password)) {
        // Generate JWT
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        //Store access token and username
        req.session.authorization = {
            accessToken, username
        };
        console.log(req.session.authorization);
        return res.status(200).send("User successfully logged in!");
    } else {
        return res.status(208).json({ message: "Invalid login. Double-Check your Username and Password."});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    let author = req.session.authorization['username'];
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
