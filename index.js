const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.engine('handlebars', engine({
    layoutsDir: 'views/layouts',
    extname: 'handlebars'
}));

app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home')
}); 

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title;
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (title, pageqty)
        VALUES ('${title}', '${pageqty}')`

    conn.query(sql, function (error) {
        if(error) {
            console.log(error)
            return
        }

        res.redirect('/books')
    })
});

app.get('/books', (req, res) => {
    const sql = `SELECT * FROM books`

    conn.query(sql, function(error, data) {
        if (error) {
            console.log(error)
            return
        }

        const books = data

        res.render('books', { books })
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, function(error, data) {
        if (error) {
            console.log(error)
            return
        }

        const book = data[0];

        res.render('book', { book })
        console.log(book)
    })
});

//CONEXÃO COM O BANCO DE DADOS MYSQL
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'teste',
});

//usar a conexão
conn.connect( (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Conectou ao MySQL!')
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    }
});
