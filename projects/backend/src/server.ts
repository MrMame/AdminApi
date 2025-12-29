// wake-api.js
// Minimaler Express-Server, der Wake-on-LAN Magic Packets verschickt.
import "./config/env.js";         // Loads the .env File defined by EnvironmentVariable NODE_ENV
import LinuxNetworkService from "./services/network/LinuxNetworkService.js";
import express from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { expressjwt } from 'express-jwt';
import path from 'path';
import { fileURLToPath } from 'url';
import ArpScanner from "./provider/system/network/ArpScanner.js";
import WakeOnLanDeviceInfo from "./models/network/WakeOnLanDeviceInfo.js";

// Dependencies INIT
const __linuxNetworkService:LinuxNetworkService = new LinuxNetworkService(new ArpScanner);

// Express INIT
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





app.use(express.json());

const SECRET = process.env.JWT_SECRET || process.env.JWT_SECREAT_FALLBACK;
const PORT = process.env.PORT || 3000;
if(SECRET===undefined)throw new Error("CRITICAL - No Web Token Secret provided.")

// 🛡️ JWT-Middleware für geschützte Routen
const requireAuth = expressjwt({
  secret: SECRET,
  algorithms: ['HS256'],
});
// Beispielhafte Benutzer-Datenbank
let userName = process.env.USR_EXAMPLE_NAME;
let userPass = process.env.USR_EXAMPLE_PASSWORD;
let userSalt = process.env.USR_EXAMPLE_HASHSALT;
if(userPass===undefined||userName===undefined||userSalt===undefined)throw new Error("No ExampleUser Credentials provided");
const users = [
  { username: userName, passwordHash: bcrypt.hashSync(userPass, userSalt)},
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



app.get('/wake/status/alien', requireAuth, async (req, res) => {
  const targetMac  = process.env.NETWORK_ALIEN_MAC  ??'';
  const targetName = process.env.NETWORK_ALIEN_NAME ??'';
  let statusText = await __linuxNetworkService.ReadNetworkStatus(targetName, targetMac)
  res.send(statusText);
});

app.get('/wake/status/nas' , requireAuth, async (req, res) => {
  const targetMac  = process.env.NETWORK_NAS_MAC  ??'';
  const targetName = process.env.NETWORK_NAS_NAME ??'';
  let statusText = await __linuxNetworkService.ReadNetworkStatus(targetName, targetMac)
  res.send(statusText);
});

app.get('/wake/nas', requireAuth, async (req, res) => {
  let targetMac = process.env.NETWORK_NAS_MAC  ??'';
  let wolBoradcastIP = process.env.NETWORK_WOL_BROADCAST_IP  ??'';
  let wolPort = Number(process.env.NETWORK_WOL_PORT)  ?? 9;
  let wolInfo = new WakeOnLanDeviceInfo(targetMac, wolBoradcastIP, wolPort);
  __linuxNetworkService.SendMagicPackage(wolInfo);
});

app.get('/wake/alien', requireAuth, async (req, res) => {
  let targetMac = process.env.NETWORK_ALIEN_MAC  ??'';
  let wolBoradcastIP = process.env.NETWORK_WOL_BROADCAST_IP  ??'';
  let wolPort = Number(process.env.NETWORK_WOL_PORT)  ?? 9;
  let wolInfo = new WakeOnLanDeviceInfo(targetMac, wolBoradcastIP, wolPort);
  __linuxNetworkService.SendMagicPackage(wolInfo);
});


// 📦 Geschützte Route
app.get('/private', requireAuth, (req, res) => {
  // `req.auth` enthält die entschlüsselten JWT-Daten
  res.json({
    // message: `Hallo ${req.auth?.username}, dies ist ein geheimer Bereich!`,
    message: `Hallo , dies ist ein geheimer Bereich!`,
  });
});

// Optional: einfache GET-Route zur Kontrolle
app.get('/',requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// app.use hängt middleware in die bearbeitungskette des servers. diese middleware handler werden vor jeder Pfadauswertung ausgeführt.
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    console.error('JWT Fehler:', err.message);
    return res.sendFile(path.join(__dirname, 'public', 'login.html'));
  }

  // andere Fehler weiterreichen
  next(err);
});

// Static Files (CSS, JS etc.)
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, () => console.log(
  `Publics Sites: 
  'http://localhost:${PORT}'
  'http://localhost:${PORT}/login.html'

  API :
  'http://localhost:${PORT}/login'
  'http://localhost:${PORT}/wake/nas'
  'http://localhost:${PORT}/wake/status/nas'
  'http://localhost:${PORT}/wake/alien'
  'http://localhost:${PORT}/wake/status/alien'`));

