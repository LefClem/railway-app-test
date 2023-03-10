const express = require("express");
const app = express();
const db = require('./db.mysql');


app.use('auth', authRoutes);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });


app.get('/home', async (req, res, next) => {
    res.send('Hello world !')
})

app.get('/depense', (req, res, next) => {
    let sql = 'SELECT * FROM ' + db.config.database + ".Spending";
    db.query(sql, (err, results) => {
        try {
            if(err) throw err;
            res.send(results)
        } catch (error) {
            res.send(error)
            console.error(error);
        }
    })
})

module.exports = app;