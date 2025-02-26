const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 20000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection({
    host: '192.168.65.249',
    user: 'root',
    password: 'root',
    database: 'tournois_futsal'
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
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://192.168.65.249:${PORT}`);
});
