const express = require("express");

var bodyParser = require("body-parser");

// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "mysql.94dev.com",
  user: "usman94",
  password: "usman94usman",
  database: "vehiclesdb",
});

console.log("Hello world");

const app = express();

app.use(bodyParser.json());

// get all vehicles
app.get("/vehicles", (req, res) => {
  connection.query("SELECT * FROM vehicle;", (err, results, fields) => {
    console.log(results);

    if (err) {
      console.log(err);
      res.status(500).json({
        message: "error",
        error: err.message,
      });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({
        message: "data not found",
      });
      return;
    }

    res.json({
      message: "data fetched",
      data: results,
    });
  });
});

app.get("/vehicle/:id", (req, res) => {
  connection.query(
    `SELECT * FROM vehicle WHERE id = ${req.params.id};`,
    (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "error",
          error: err.message,
        });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({
          message: "data not found",
        });
        return;
      }

      res.json({
        message: "data fetched",
        data: results,
      });
    }
  );
});

app.post("/vehicle", (req, res) => {
  let sql = "INSERT INTO vehicle (name, number, email) VALUES (?, ?, ?)";
  let values = [req.body.name, req.body.number, req.body.email];
  connection.query(sql, values, (err, res) => {
    if (err) throw err;
    console.log("successfully inserted");
    console.log(res);
  });

  console.log("This is body-parse", req.post);

  res.json({
    message: "successfully inserted",
  });
});

app.put("/vehicle/:id", (req, res) => {

    // TODO: update data 

    // handle invalid id

  let sql = `UPDATE vehicle 
    SET name=?,
    number=?,
    email=?
    WHERE id=${req.params.id} ;`;

  let values = [req.body.name, req.body.number, req.body.email];
  connection.query(sql, values, (err, response) => {
    if (err) throw err;
    console.log("successfully updated");
    console.log(response);
    console.log("This is Update", req.post);
  
    res.json({
      message: "successfully updated",
      data: response
    });
  });

});

app.delete("/vehicle/:id", (req, res) => {
  let sql = `DELETE FROM vehicle where id=${req.params.id}`;

  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log("successfully deleted");
    console.log(res);
  });

  res.json({
    message: "successfully deleted",
  });
});

app.listen(3000);

// GET vehicle by id - done
// GET all vehicles - done
// POST new vehicle
// PUT - edit existing vehicle
// DELETE a vehicle
