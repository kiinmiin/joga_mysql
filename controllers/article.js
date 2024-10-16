// import database connection
const con = require('../utils/db');

// näita kõikki artikkleid - index leht
const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw (err);
        articles = result
        res.render('index', {
            articles: articles
        })
    })
};

// show articles by this slug
const getArticleBySlug = (req, res) => {
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
};

// get author id by link
const getAuthorRoute = (req, res) => {
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
}; 

// export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug,
    getAuthorRoute
}; 