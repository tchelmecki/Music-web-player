import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors());

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

app.get("/library", (req,res) => {
    const q = "SELECT * FROM studenci";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data);
    })
});

app.post("/library", (req,res)=>{
    const q = "INSERT INTO studenci (`studenci_id`,`imie`,`nazwisko`,`numer_indeksu`) VALUES (?)";
    const values = [
        null,
        req.body.imie,
        req.body.nazwisko,
        req.body.numer_indeksu,
    ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Adding has been created");
    });
});

app.delete("/library/:studenci_id", (req,res)=>{
    const libraryId = req.params.studenci_id;
    const q = "DELETE from studenci WHERE studenci_id = ?";

    db.query(q,[libraryId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Library has been deleted");
    });
})

app.listen(8800, ()=>{
    console.log("connected to backend!");
});