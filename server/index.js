import express from "express";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project",
    port: 55555
}); 

app.get("/main", (req, res) => {
    if(req.session.username) {
        return res.json({valid: true, username: req.session.username});
    } else {
        return res.json({valid: false});
    }
});

app.post("/logout", (req, res) => {
    // Czyszczenie sesji lub usuwanie plików cookie, w zależności od używanej metody uwierzytelniania
    req.session.destroy((err) => {
      if (err) {
        console.error("Błąd podczas niszczenia sesji:", err);
        return res.status(500).json({ Message: "Błąd podczas wylogowywania" });
      }
      // Zakończ sesję i zwróć odpowiedź sukcesu
      res.clearCookie("connect.sid");
      return res.json({ Message: "Wylogowano pomyślnie" });
    });
  });
  

app.get("/library", (req,res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data);
    })
});

app.post('/signup', (req, res) => {
    const q = "INSERT INTO users (``,`username`, `email`, `pswd`) VALUES (?)";
    const values = [
        null,
        req.body.username,
        req.body.email,
        req.body.pswd
    ]
    db.query(q, [values], (err, result) => {
        if(err) return res.json({Message: "Error in Node"});
        return req.json(result);
    })
})



app.post('/login', (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? and pswd = ?";
    db.query(q, [req.body.email, req.body.pswd], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        if(result.length > 0){
            req.session.username = result[0].username;
            // console.log(req.session.username);
            return res.json({Login: true})
        } else {
            return res.json({Login: false})
        }
    })
})

// app.post('/signup', (req, res) => {
//     const q = "SELECT * FROM users WHERE `email` = ? AND `pswd` = ?";
//     db.query(q, [req.body.email, req.body.pswd], (err, data) => {
//         if(err) {
//             return res.json("Error");
//         }
//         if(data.length > 0){
//             const id = data[0].id;
//             const token = jwt.sign({id}, "jwstSecretKey", {expiresIn: 300});
//             return res.json({Login: true, token, data})
//         } else {
//             return res.json("Fail");
//         }
//     })
// })


app.get("/songs", (req,res) => {
    const q = "SELECT `author`,`title`, `genre`, `album` from songs";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.post("/library", (req,res)=>{
    const q = "INSERT INTO users (`id_users`,`username`,`email`,`pswd`) VALUES (?)";
    const values = [
        null,
        req.body.username,
        req.body.email,
        req.body.pswd,
    ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Adding has been created");
    });
});


app.delete("/library/:id_users", (req,res)=>{
    const libraryId = req.params.studenci_id;
    const q = "DELETE from users WHERE id_users = ?";

    db.query(q,[libraryId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Library has been deleted");
    });
})

app.listen(8800, ()=>{
    console.log("connected to backend!");
});