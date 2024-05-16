import express from "express";
import path from "path";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import crypto from "crypto";
import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import jwt from 'jsonwebtoken';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetsPath = path.join(__dirname, 'assets');

app.use('/assets', express.static(assetsPath));

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE"],
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
      console.error('Connect error:', err.message);
    //   return res.status(500).json({ error: 'Błąd połączenia z bazą danych' });
    } else {
      console.log('Connected');
    }
  });

  app.use((req, res, next) => {
    console.log('Received cookies:', req.cookies);
    next();
});

const storage = multer.diskStorage({
    destination: 'assets/',
    filename: (req, file, cb) => {
      const fileName = `${file.originalname}`;
      cb(null, fileName);
    }
});

const upload = multer({ storage });

app.post('/upload', upload.fields([{ name: 'musicFile', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]), (req, res) => {
    const { title, artist, album, genre, playlistId } = req.body;

    const musicFileName = req.files['musicFile'][0].originalname;
    const coverFileName = req.files['coverImage'][0].originalname;

    const musicFilePath = `${musicFileName}`;
    const coverImagePath = `${coverFileName}`;

    const insertQuery = 'INSERT INTO songs (title, author, album, genre, file_path, cover, playlists_playlist_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [title, artist, album, genre, musicFilePath, coverImagePath, playlistId];
  
    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Error inserting song into database:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      return res.json({ success: true, musicFilePath, coverImagePath });
    });
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
    req.session.destroy((err) => {
      if (err) {
        console.error("Błąd podczas niszczenia sesji:", err);
        return res.status(500).json({ Message: "Błąd podczas wylogowywania" });
      }
      res.clearCookie("connect.sid");
      return res.json({ Message: "Wylogowano pomyślnie" });
    });
});

//SHA-256 - to change it
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
            req.session.user_id = user.user_id; 
            req.session.email = user.email;        
            return res.json({ Login: true });
        } else {
            return res.json({ Login: false });
        }
    });
});

app.post('/playlists', upload.single('coverImage'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No cover image uploaded' });
      }
  
      const { name_playlist } = req.body;
      const user_id = req.session.user_id;
      const coverFileName = req.file.filename;
  
      console.log('User ID from session:', user_id);

      if (!user_id) {
        console.log('Unauthorized access attempt to /uploadCover');
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const result = db.query('INSERT INTO playlists (name_playlist, user_id, cover) VALUES (?, ?, ?)', [name_playlist, user_id, coverFileName]);
      const playlistId = result.insertId;
  
      console.log('Playlist created successfully. Playlist ID:', playlistId);
  
      res.json({ success: true, playlist_id: playlistId, message: 'Playlist created successfully' });
    } catch (error) {
      console.error('Error creating playlist:', error.message);
      res.status(500).json({ error: 'Error creating playlist' });
    }
  });

app.get("/playlists", (req, res) => {
    const user_id = req.session.user_id;
    const q = "SELECT playlists.playlist_id, playlists.name_playlist, playlists.user_id, playlists.cover FROM playlists JOIN users ON playlists.user_id = users.user_id WHERE playlists.user_id = ?";
    db.query(q, [user_id], (err, data) => {
        if(err) return res.json(err)
        return res.json(data);
    });
});

app.get("/user-songs", async (req, res) => {
      const user_id = req.session.user_id;
  
      const q = 'SELECT songs.* FROM songs JOIN playlists ON songs.playlists_playlist_id = playlists.playlist_id JOIN users ON playlists.user_id = users.user_id WHERE users.user_id = ?';
  
      db.query(q, [user_id], (err, data) => {
        if(err) return res.json(err)
        return res.json(data);
      })
});

app.get("/playlists/:playlistId", async (req, res) => {
    const playlistId = req.params.playlistId;
  
    const q = 'SELECT songs.title, songs.author, songs.album, songs.genre, songs.cover, songs.file_path, songs.playlists_playlist_id, playlists.playlist_id, playlists.name_playlist FROM songs INNER JOIN playlists ON songs.playlists_playlist_id = playlists.playlist_id WHERE playlists.playlist_id = ?';
  
    db.query(q, [playlistId], (err, data) => {
      if (err) return res.json(err);
  
      console.log('Otrzymany id playlisty:', playlistId);
      console.log('Dane piosenek z playlisty:', data);
  
      return res.json(data);
    });
  });
  

app.delete('/playlists/:playlistId', async (req, res) => {
    try {
      const user_id = req.session.user_id;
      const playlistId = req.params.playlistId;
      
      //delete attached songs
      const deleteSongsQuery = 'DELETE FROM songs WHERE playlists_playlist_id = ?';
      await db.query(deleteSongsQuery, [playlistId]);
      
      //delete a playlist
      const deletePlaylistQuery = 'DELETE FROM playlists WHERE playlist_id = ?';
      await db.query(deletePlaylistQuery, [playlistId]);
  
      res.header('Access-Control-Allow-Methods', 'DELETE'); // Dodaj ten nagłówek
      res.json({ success: true, message: 'Playlist and associated songs deleted successfully' });
    } catch (error) {
      console.error('Error deleting playlist and associated songs:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


app.listen(8800, ()=>{
    console.log("connected to backend!");
});