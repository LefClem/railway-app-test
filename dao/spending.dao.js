const db = require("../db.mysql");

class SpendingModels {
  getSpendings(userId) {
    let sql = `SELECT * FROM Spending WHERE userId = ?`;
    return new Promise((resolve) => {
      db.query(sql, userId, (err, results) => {
        try {
          resolve(results);
        } catch (error) {
          throw err;
        }
      });
    });
  }

  getOneSpending(id) {
    let sql = `SELECT * FROM Spending WHERE idSpending = ${id}`;
    return new Promise((resolve) => {
      db.query(sql, (err, results) => {
        try {
          resolve(results);
        } catch (error) {
          throw err;
        }
      });
    });
  }

  createSpending(data) {
    let sql = `INSERT INTO Spending SET ?`;
    let sqlSearch = `SELECT * FROM Spending WHERE idSpending = ?`;
    return new Promise((resolve) => {
      try {
        db.query(sql, data, (err, results) => {
          if (err) throw err;
          db.query(sqlSearch, results.insertId, (err, results) => {
            if (err) throw err;
            resolve(results);
          });
        });
      } catch (error) {
        throw error;
      }
    });
  }

  updateSpending(id, data) {
    let sql = `UPDATE Spending SET ? WHERE idSpending = ${id}`;
    return new Promise((resolve) => {
      try {
        db.query(sql, data, (err, results) => {
          resolve(results);
        });
      } catch (error) {
        throw error;
      }
    });
  }

  deleteSpending(id){
    let sql = `DELETE FROM Spending WHERE idSpending = ${id}`;
    return new Promise((resolve) => {
        try {
            db.query(sql, (err, results) => {
                resolve(results)
            })
        } catch (error) {
            throw error;
        }
    })
  }
}



module.exports = SpendingModels;
