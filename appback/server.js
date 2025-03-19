const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();  
console.log("DB Config:", process.env.DB_HOST, process.env.DB_PORT);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err.stack);
        return;
    }
    console.log('Connecté à la base de données avec succès!');
});


// Vérifier la connexion
db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Route test
app.get('/', (req, res) => {
    res.send('API Tournois Futsal en ligne');
});

// Exemple : Récupérer toutes les équipes
app.get('/equipes', (req, res) => {
    db.query('SELECT * FROM equipes', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://192.168.65.249:${PORT}`);
});
            