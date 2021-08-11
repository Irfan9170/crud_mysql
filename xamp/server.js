const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"dbm"
});

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    else {
        console.log("DB Connected")
    }
});

const app = express();
app.use(bodyParser.json());

//Creating databse
app.get('/createDB',(req,res)=>{
    let sql = "CREATE DATABASE dbm";
    db.query(sql,(err)=>{
        if(err){
            console.log(err)
        }
        else {
            res.send("DATABASE CREATED");
        }
    })
})


//Creating table
app.get('/createtable',(req,res)=>{
    let sql = "CREATE TABLE students(id int AUTO_INCREMENT, name VARCHAR(200), PRIMARY KEY(id))"
    db.query(sql,(err)=>{
        if(err){
            console.log(err)
        }
        else {
            res.send("TABLE CREATED");
        }
    }) 
})
//Adding rows
app.get('/add',(req,res)=>{
    // let add = {id:1,name:"IRFAN"};
    let add = req.body;
    let sql = "INSERT INTO students SET ?";
    db.query(sql,add,(err)=>{
        if(err){
            console.log(err)
        }
        else {
            res.send("ADDED");
        }
    }) 
})
//Reading the rows
app.get('/all',(req,res)=>{
    console.log(req.body)
    let sql = "SELECT * FROM students";
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err)
        }
        else {
            res.send(results);
        }
    }) 
})

app.get('/student/:id',(req,res)=>{
    
    let sql = `SELECT * FROM students WHERE id =${req.params.id}`;
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err)
        }
        else {
            res.send(results);
        }
    }) 
})


//Updating rows
app.get('/update/:id',(req,res)=>{
   let update = "Updated Name";
   console.log(req.params.id)
    let sql = `UPDATE students SET name ='${update}' WHERE id =${req.params.id}`;
    db.query(sql,err=>{
        if(err){
            console.log(err)
        }
        else {
            res.send("Updated");
        }
    }) 
})
//Deleating rows
app.get('/delete/:id',(req,res)=>{
    // console.log(req.params.id)
     let sql = `DELETE FROM students WHERE id =${req.params.id}`;
     db.query(sql,err=>{
         if(err){
             console.log(err)
         }
         else {
             res.send("Deleted");
         }
     }) 
 })

app.listen(3000,()=>{
    console.log("server started at 3000")
})