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
    
    let username = req.body.username;
    let password = req.body.password;
    

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
        return res.status(200).send("User successfully logged in!");
    } else {
        return res.status(208).json({ message: "Invalid login. Double-Check your Username and Password."});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

    let author = req.session.authorization['username'];
    const rev = req.body.desc;
    const isbn = req.params.isbn;

    if(!rev){
        return res.status(404).json({ message: "Please provide a review description."});
    }

    for(let review in books[isbn].reviews){
        if(books[isbn].reviews[review].author === author){
            books[isbn].reviews[review].content = rev;
            return res.status(200).json({
                message: "Review successfully edited!",
                author: author,
                content: rev
            });
        }
    }

    let numReviews = Object.keys(books[isbn].reviews).length;
    
    numReviews++;
    books[isbn].reviews[numReviews] = {
        "author": author,
        "content": rev
    };

    return res.status(200).json({ 
        message: "Review successfully created!",
        author: author,
        content: rev});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {

    let author = req.session.authorization['username'];
    const isbn = req.params.isbn;

    for(let review in books[isbn].reviews){
        if(books[isbn].reviews[review].author === author){
            let content = books[isbn].reviews[review].content;
            delete books[isbn].reviews[review];
            return res.status(200).json({
                message: "Review Successfully Deleted!",
                author: author,
                contentRemoved: content
            });
        }
    }
    return res.status(204).json({
        message: "No Review from user found.",
        author: author
    });
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
