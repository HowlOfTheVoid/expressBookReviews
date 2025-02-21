const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const userExists = (username) => {
    let userWithSameName = users.filter((user) => {
        return user.username === username;
    });

    if (userWithSameName.length > 0){
        return true;
    } else{
        return false;
    }
}

public_users.post("/register", (req,res) => {
    const username = req.query.username;
    const password = req.query.password;
    

    if(username && password){
        if(!userExists(username)){
            users.push({"username" : username, "password" : password});
            return res.status(200).json({ message: "User successfully created. Now you may login."});
        } else{
            return res.status(404).json({ message: "User already exists!"});
        }
    } else {
        return res.status(303).json({ message: "Please provide username and password"});
    }
    return res.status(404).json({ message: "Unable to register user, unknown error"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    // Return list of all books
    res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    res.send(JSON.stringify(books[isbn], null, 4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

    const author = req.params.author;
    // Filter the books array for all books with the same author
    let authoredBooks = { };
    let numBooksFound = 0;

    for(let book in books) {
        repAuth = books[book].author.replaceAll(" ", "_");
        if(repAuth == author){
            numBooksFound++;
            authoredBooks[numBooksFound] = books[book];
        }
    }
    res.send(JSON.stringify(authoredBooks, null, 4));

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    //Filter books array for all books with said title
    let sameTitleBooks = { };
    let numBooksFound = 0;

    for(let book in books) {
        let repTitle = books[book].title.replaceAll(" ", "_");
        if(repTitle == title){
            numBooksFound++;
            sameTitleBooks[numBooksFound] = books[book];
        }
    }
    res.send(JSON.stringify(sameTitleBooks, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    res.send(JSON.stringify(books[isbn].reviews, null, 4));
});

module.exports.general = public_users;
