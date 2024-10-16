const express = require('express')
const app = express()


const path = require('path')
// Lisab template engine
const hbs = require('express-handlebars');
// Seadistab malli mootori kataloogi ja failide laiendid
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))
// Seadistab staatilise avaliku kataloogi
app.use(express.static('public'));

const mysql = require('mysql2')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// loob andmebaasiga ühenduse
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
})

con.connect((err) => {
    if(err) throw err;
    console.log('Connected to joga_mysql db')
})

// näita kõiki artikkleid - index leht
app.get('/', (req, res) =>{
    let query = "SELECT * FROM article";
    let articles = [] 
    con.query(query, (err, result) => {
        if (err) throw(err);
        articles = result
        res.render('index', {
            articles: articles
        })
    })  
});

// show article by this slug
app.get('/article/:slug', (req, res) => {
    let query = `SELECT a.*, au.name AS author_name 
                  FROM article a 
                  LEFT JOIN author au ON a.author_id = au.id 
                  WHERE a.slug="${req.params.slug}"`
    con.query(query, (err, result) => {
        if (err) throw (err);
        let article = result[0]
        console.log(article)
        res.render('article', {
            article: article
        })
    });
});

app.get('/author/:id', (req, res) => {
    let query = `SELECT * FROM article WHERE author_id=${req.params.id}`;
    con.query(query, (err, result) => {
        if (err) throw (err);
        let authorQuery = `SELECT name FROM author WHERE id=${req.params.id}`;
        con.query(authorQuery, (err, authorResult) => {
            if (err) throw (err);
            let authorName = authorResult[0].name;
            console.log(authorName)
            res.render('author', {
                articles: result,
                author_name: authorName
            }); 
        });
    });
});

// rakenduse algus punkt
app.listen(3003, () => {
    console.log('App is started at http://localhost:3003')
})