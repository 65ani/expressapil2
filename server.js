
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

//connect to mongodb
mongoose.connect('mongodb://localhost/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open',()=>{
    console.log(" succesfully connected to mongodb")
});

//db connectivity from this sitehttps://devsarticles.com/mongo-db-connection-with-express-js 
app.get('/', (req, res) => {
    res.send("hello world")
  });

let books = []; 

app.use(express.json());

app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).send('Missing title or author');
    }
        const newBook = { id: books.length + 1, title, author };
        books.push(newBook);
        res.status(201).send(newBook);
      });


// Get All Books
app.get('/books', (req, res) => {
  res.send(books);
});

// Get a Single Book
app.get('/books/:id', (req, res) => {
  // Logic to get a single book
  const book = books.find(b => {b.id === parseInt(req.params.id) });
  if(!book){
    return res.status(404).send('book not found');
  }
  res.json(book)
});


app.get('/books/:id', (req, res) => {
    res.json("get by id  request path is working");
  // Logic to update a book
});

app.put('/books/:id', (req, res) => {
        const book = books.find(b => b.id === parseInt(req.params.id));
        if (!book) {
          return res.status(404).send('Book not found');
        }
      
        const { title, author } = req.body;
        book.title = title || book.title;
        book.author = author || book.author;
      
        res.send(book);
      });
// Delete a Book
app.delete('/books/:id', (req, res) => {
  // Logic to delete a book
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }

  books.splice(bookIndex, 1);
  res.status(204).send();
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});