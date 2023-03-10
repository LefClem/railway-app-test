const mysql = require('mysql2');
require('dotenv').config();

let connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DATABASE
  });
   
  connection.connect((error) => {
    try {
        if(error) throw error;
        console.log("Connecté à la BDD " + connection.config.database + " " + connection.threadId);
    } catch (error) {
        console.error("Erreur de connexion: " + error.stack);
    }
  });

  // connection.end();

module.exports = connection;
