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
    let authoredBooks = { numBooksFound: "0" };
    let numBooksFound = 0;

    for(let book in books) {
        if(books[book].author == author){
            numBooksFound++;
            authoredBooks[numBooksFound] = books[book];
        }
    }
    authoredBooks.numBooksFound = numBooksFound;
    res.send(JSON.stringify(authoredBooks, null, 4));

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
