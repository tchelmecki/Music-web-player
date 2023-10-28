import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "biznesowe",
    port: 55555
}); 

app.get("/", (req, res) => {
    res.json("hello this is backend");
});

app.get("/studenci", (req,res) => {
    const q = "SELECT * FROM studenci";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.listen(8800, ()=>{
    console.log("connected to backend!");
});