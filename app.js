const express = require("express");
const app = express();
const db = require('./db.mysql');
const authRoutes = require('./routes/auth')
const spendingRoutes = require('./routes/spending')

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/spend', spendingRoutes);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });




module.exports = app;