const db = require("../db.mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

class UserModels {
  signup(user, email) {
    let sqlSearch = "SELECT * FROM User WHERE email = ?";
    let sql = `INSERT into User SET ?`;

    return new Promise((resolve) => {
      db.query(sqlSearch, email, (err, results) => {
        let email = results[0];

        if (email === undefined) {
            db.query(sql, user, (err, results) => {
            try {
              if (err) throw(err);
              resolve(results);
            } catch (error) {
              throw error;
            }
          });
        } else if(email.email){
          return resolve(results);
        }
      });
    });
  }

  login(email, password) {
    let sql = `SELECT * FROM User WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [email, password], async (err, results) => {
        if (results == 0) {
          reject({ message: "Utilisateur introuvable !" });
        } else {
          const valid = await bcrypt.compare(password, results[0].password);
          if (!valid) {
            reject({ message: "Paire identifiant/mot de passe incorrect" });
          } else {
            resolve({
              user_id: results[0].id,
              token: jwt.sign(
                { userId: results[0].id },
                process.env.SECRET_KEY,
                { expiresIn: "24H" }
              ),
            });
          }
        }
      });
    });
  }

}

module.exports = UserModels;