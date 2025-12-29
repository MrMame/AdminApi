/* ============================= Beispielcode zum Testen =======================================
    🧪 5. Test mit curl oder Postman
    ➤ Login
      curl -X POST http://localhost:3000/login \
        -H "Content-Type: application/json" \
        -d '{"username":"admin", "password":"pass123"}'


      Antwort:

      { "token": "eyJhbGciOi..." }

    ➤ Zugriff auf geschützte Route
      curl http://localhost:3000/private \
        -H "Authorization: Bearer eyJhbGciOi..." 


      Antwort:

      { "message": "Hallo admin, dies ist ein geheimer Bereich!" }

    🧩 6. Erklärung
      Teil	Beschreibung
      expressjwt()	Middleware, die automatisch JWT prüft
      secret	Dein geheimer Schlüssel aus .env
      algorithms	Muss mit dem Algorithmus übereinstimmen, den du beim jwt.sign verwendest
      req.auth	Enthält das entschlüsselte Token (z. B. { username: 'admin' })
      jsonwebtoken	Zum Erstellen und Verifizieren von Tokens
      bcrypt	Zum sicheren Speichern von Passwörtern

   ============================= Beispielcode zum Testen =======================================


*/


import "./config/env.js";         // Loads the .env File defined by EnvironmentVariable NODE_ENV

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'fallback-secret';
const PORT = process.env.PORT || 3000;

// Beispielhafte Benutzer-Datenbank
const users = [
  { username: 'admin', passwordHash: bcrypt.hashSync('pass123', 10) },
];

// 📍 Login-Endpunkt
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) return res.status(401).json({ message: 'Benutzer nicht gefunden' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Falsches Passwort' });

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// 🛡️ JWT-Middleware für geschützte Routen
const requireAuth = expressjwt({
  secret: SECRET,
  algorithms: ['HS256'],
});

// 📦 Geschützte Route
app.get('/private', requireAuth, (req, res) => {
  // `req.auth` enthält die entschlüsselten JWT-Daten
  res.json({
    // message: `Hallo ${req.auth?.username}, dies ist ein geheimer Bereich!`,
    message: `Hallo , dies ist ein geheimer Bereich!`,
  });
});

// 🌐 Öffentliche Route
app.get('/', (req, res) => {
  res.send('Willkommen zur API! POST /login für Token, GET /private für Test');
});

app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));
