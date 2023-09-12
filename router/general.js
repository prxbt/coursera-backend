const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

  


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const ans=books;
  console.log(ans);
  return res.status(200).send(JSON.stringify(ans));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  return res.status(200).send(JSON.stringify(books[isbn]));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author=req.params.author;
  console.log(author);
  var arr=[];

 
  for(var i in books)
  {
      if(books[i].author===author)
      {
          let curr={
              'isbn' : i,
              'title': books[i].title,
              'reviews':books[i].reviews
          }

          arr.push(curr);
          
      }
     
  }

  return res.status(200).send(JSON.stringify({booksbyauthor : arr}));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title=req.params.title;
  console.log(title);
  var arr=[];
 
  for(var i in books)
  {
      if(books[i].title===title)
      {
          let curr={
              'isbn' : i,
              'author': books[i].author,
              'reviews':books[i].reviews
          }

          arr.push(curr);
          
      }
     
  }

  return res.status(200).send(JSON.stringify({booksbytitle : arr}));
  //return res.status(200).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn=req.params.isbn;
  console.log(isbn);
  //Write your code here
  return res.status(200).send(JSON.stringify(books[isbn].reviews));
});

module.exports.general = public_users;
