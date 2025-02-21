const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
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
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
