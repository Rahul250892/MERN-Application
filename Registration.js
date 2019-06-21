var mysql = require('mysql');
var express = require('express');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.json());



var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb",
    multistatement: true
  });

  
  con.connect((err) =>{
    if(!err)
    console.log('DB Connection sucees');
    else
    console.log('Db connection fails' + JSON.stringify(err,undefined,2));
  });



app.get('/users', (request, response) => {
    con.query('SELECT * FROM registration', (error, result) => {
        if (error) throw error;
  
        response.send(result);
    });
  });
  
  // Display a single user by ID
  app.get('/users/:id', (request, response) => {
    const id = request.params.id;
  
    con.query('SELECT * FROM registration WHERE id = ?', id, (error, result) => {
        if (error) throw error;
  
        response.send(result);
    });
  });
  
  // Add a new user
  app.post('/users', (request, response) => {
    con.query('INSERT INTO registration SET ?', request.body, (error, result) => {
        if (error) throw error;
  
        response.status(201).send(`User added with ID: ${result.insertId}`);
    });
  });
  
  // Update an existing user
  app.put('/users/:id', (request, response) => {
    const id = request.params.id;
  
    con.query('UPDATE registration SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;
  
        response.send('User updated successfully.');
    });
  });
  
  
  // Delete a user
  app.delete('/users/:id', (request, response) => {
    const id = request.params.id;
  
    con.query('DELETE FROM registration WHERE id = ?', id, (error, result) => {
        if (error) throw error;
  
        response.send('User deleted.');
    });
  });
  
  
var server = app.listen(8080, function () {
    console.log('Node server is running.... 8080'+server);
});