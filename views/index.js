const express = require('express')
const app = express()


const path = require('path')
// Lisab template engine
const hbs = require('express-handlebars');
// Seadistab malli mootori directory ja failide laiendid
app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))

const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

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

app.listen(3003, () => {
    console.log('App is started at http://localhost:3003')
})