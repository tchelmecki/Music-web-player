import express from "express";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import crypto from "crypto";
// import jwt from 'jsonwebtoken';

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
    database: "musicwebplayer",
    port: 55555
}); 

db.connect((err) => {
    if (err) {
      console.error('Błąd połączenia z bazą danych:', err.message);
    //   return res.status(500).json({ error: 'Błąd połączenia z bazą danych' });
    } else {
      console.log('Połączono z bazą danych');
    }
  });

  app.use((req, res, next) => {
    console.log('Received cookies:', req.cookies);
    next();
});


app.get("/songs", (req, res) => {
    if(req.session.username) {
        console.log("Logged in user:", req.session.username);
        
        return res.json({valid: true, username: req.session.username});
    } else {
        console.log("Not logged in");

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

//SHA-256
const hashPassword = (password) => {

    const passwordString = Array.isArray(password) ? password.join('') : password;

    const sha256 = crypto.createHash("sha256");
    sha256.update(passwordString);
    return sha256.digest("hex");
};



app.post('/signup', (req, res) => {
    const hashedPassword = hashPassword(req.body.pswd); 
    const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.email,
        hashedPassword, 
    ];
    db.query(q, [values], (err, result) => {
        if(err) return res.json({ Message: "Error in Node" });
        return res.json(result);
    });
});

// app.post('/login', (req, res) => {
//     const hashedPassword = hashPassword(req.body.pswd); 

//     const q = "SELECT * FROM users WHERE email = ? and password = ?";
//     db.query(q, [req.body.email, hashedPassword], (err, result) => {
//         if(err) return res.json({Message: "Error inside server"});
//         if(result.length > 0){
//             req.session.username = result[0].username;
//             // console.log(req.session.username);
//             return res.json({Login: true})
//         } else {
//             return res.json({Login: false})
//         }
//     })
// })

app.post("/login", (req, res) => {
    const hashedPassword = hashPassword(req.body.pswd);

    const q = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(q, [req.body.email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error inside server:', err.message);
            return res.json({ Message: "Error inside server" });
        }

        if (result.length > 0) {
            const user = result[0];
            req.session.username = user.username;
            req.session.user_id = user.user_id; // Ustaw rzeczywisty identyfikator użytkownika
        
            // Zapisz user_id, username i email w ciasteczkach
            res.cookie('user_id', String(req.session.user_id), { sameSite: 'None', secure: true });
            res.cookie('username', req.session.username, { sameSite: 'None', secure: true });
            res.cookie('email', user.email, { sameSite: 'None', secure: true });
        
            return res.json({ Login: true });
        } else {
            return res.json({ Login: false });
        }
    });
});

app.get("/songs", (req,res) => {
    const q = "SELECT `author`,`title`, `genre`, `album`, `file_path`, `cover` from songs";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data);
    })
})

// app.get("/users", (req, res) => {
//     const q = "SELECT * FROM users LIMIT 10";
    
//     db.query(q, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// });

// app.get("/library", (req,res) => {
//     const q = "SELECT * FROM users LIMIT 10";
//     db.query(q, (err, data) => {
//         if(err) return res.json(err)
//         return res.json(data);
//     })
// });



app.post('/playlists', async (req, res) => {
    try {
        const { name_playlist } = req.body;

        // Dodaj log tutaj
        console.log('User ID from session:', req.session.user_id);

        if (req.cookies.user_id) {
            const user_id = req.cookies.user_id;
            const result = await db.query('INSERT INTO playlists (name_playlist, user_id) VALUES (?, ?)', [name_playlist, user_id]);
            const playlistId = result.insertId;

            console.log('Playlist created successfully. Playlist ID:', playlistId);

            res.json({ success: true, playlist_id: playlistId, message: 'Playlist created successfully' });
        } else {
            // Dodaj log tutaj
            console.log('Unauthorized access attempt to /library');

            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.error('Error creating playlist:', error.message);
        res.status(500).json({ error: 'Error creating playlist' });
    }
});



  


  

app.listen(8800, ()=>{
    console.log("connected to backend!");
});