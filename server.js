const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Stockage temporaire (effacé au redémarrage)
const sessions = new Map();

// Sauvegarde des cookies
app.post('/save', (req, res) => {
  const { id, data } = req.body;
  sessions.set(id, data);
  res.send('OK');
});

// Récupération des cookies
app.get('/get', (req, res) => {
  const { id } = req.query;
  const data = sessions.get(id);
  if (!data) return res.status(404).send('Non trouvé');
  sessions.delete(id); // Suppression après lecture
  res.json(data);
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
