const express = require("express")
const app = express()

app.use(express.json())

app.listen(3000, ()=>{
    console.log("Books service running on port 3000")
})

const { sequelize, Book } = require('../database');


app.get('/api/books', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

app.get('/api/books/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) res.json(book);
    else res.status(404).json({ error: 'Book not found' });
});

app.post('/api/books', async (req, res) => {
    const { title, author, year } = req.body;
    const book = await Book.create({ title, author, year });
    res.json({ id: book.id });
});

app.delete('/api/books/:id', async (req, res) => {
    const rowsDeleted = await Book.destroy({ where: { id: req.params.id } });
    if (rowsDeleted) res.status(204).end();
    else res.status(404).json({ error: 'Book not found' });
});
