Perfekt — hier ein **kleines, schlankes Node.js-API-Tool** (Express) das auf Befehl ein Wake-on-LAN *Magic Packet* an eine Zieladresse sendet. Keine Fremd-Dependencies außer `express` (reines Node + dgram). Einfach Datei speichern, installieren und starten.

### 1) Datei: `wake-api.js`

```javascript
// wake-api.js
// Minimaler Express-Server, der Wake-on-LAN Magic Packets verschickt.

const express = require('express');
const dgram = require('dgram');

const app = express();
app.use(express.json());

// Hilfsfunktion: MAC-String in Buffer (6 Bytes) umwandeln
function macToBuffer(mac) {
  // Erlaubt Trennzeichen : - oder ohne
  const clean = mac.replace(/[^a-fA-F0-9]/g, '');
  if (clean.length !== 12) throw new Error('Ungültige MAC (muss 12 hex Zeichen haben)');
  const bytes = Buffer.alloc(6);
  for (let i = 0; i < 6; i++) bytes[i] = parseInt(clean.substr(i*2, 2), 16);
  return bytes;
}

// Magic Packet bauen: 6 x 0xFF gefolgt von MAC x16
function buildMagicPacket(mac) {
  const macBuf = macToBuffer(mac);
  const packet = Buffer.alloc(6 + 16 * 6, 0xff);
  for (let i = 0; i < 16; i++) macBuf.copy(packet, 6 + i*6);
  return packet;
}

/**
 * POST /wake
 * Body JSON:
 * {
 *   "mac": "AA:BB:CC:DD:EE:FF",   // required
 *   "broadcast": "192.168.1.255", // optional, default: 255.255.255.255
 *   "port": 9                      // optional, default: 9
 * }
 */
app.post('/wake', async (req, res) => {
  try {
    const { mac, broadcast = '255.255.255.255', port = 9 } = req.body;
    if (!mac) return res.status(400).json({ error: 'mac is required' });

    const packet = buildMagicPacket(mac);
    const socket = dgram.createSocket('udp4');

    socket.on('error', (err) => {
      console.error('Socket error:', err);
      socket.close();
    });

    // Broadcast erlauben
    socket.bind(() => {
      try {
        socket.setBroadcast(true);
      } catch (e) {
        console.warn('setBroadcast failed:', e.message);
      }
      socket.send(packet, 0, packet.length, port, broadcast, (err) => {
        socket.close();
        if (err) {
          console.error('Send error:', err);
          return res.status(500).json({ success: false, error: err.message });
        } else {
          return res.json({ success: true, mac, broadcast, port });
        }
      });
    });

  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
});

// Optional: einfache GET-Route zur Kontrolle
app.get('/', (req, res) => {
  res.send('Wake API läuft. POST /wake mit JSON { mac, broadcast?, port? }');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Wake API läuft auf http://localhost:${PORT}`));
```

### 2) Installation & Start

```bash
# Node-Projekt initialisieren (falls noch nicht)
npm init -y

# Express installieren
npm install express

# Starten
node wake-api.js
```

(Optional kannst du `pm2` oder systemd verwenden, um den Prozess persistent zu machen.)

### 3) Beispiele: Magic Packet senden

```bash
# Einfaches Beispiel (Broadcast 255.255.255.255, Port 9)
curl -X POST http://localhost:3000/wake \
  -H "Content-Type: application/json" \
  -d '{"mac":"AA:BB:CC:DD:EE:FF"}'

# Mit lokalem Netzwerk-Broadcast (empfohlen, zuverlässiger)
curl -X POST http://localhost:3000/wake \
  -H "Content-Type: application/json" \
  -d '{"mac":"AA:BB:CC:DD:EE:FF", "broadcast":"192.168.1.255", "port":9}'
```

### Hinweise / Troubleshooting

* Stelle sicher, dass **Wake-on-LAN im BIOS/UEFI** des Zielrechners aktiviert ist und die Netzwerkkarte WoL unterstützt.
* Der Zielrechner muss im Standby oder ausgeschaltet (aber mit Strom und Netzwerkkarte aktiv) sein — einige Geräte wecken nur aus bestimmten Energiezuständen.
* Verwende möglichst die **netzwerkinterne Broadcast-Adresse** (z. B. `192.168.1.255`) statt `255.255.255.255`, das ist oft zuverlässiger in Home-LANs/ROUTERN.
* Falls du die API auf einem Raspberry Pi ausführst und Probleme auftreten, probiere die API als normaler User — keine speziellen Root-Rechte erforderlich — aber manche Netzwerk-Setups/Firewall-Regeln können blocken.
* Wenn du mehrere Interfaces hast und du das Paket über ein bestimmtes Interface senden willst, können wir das Script erweitern, um das Socket an eine Interface-IP zu binden.

---

Wenn du willst, erweitere ich das Tool noch um:

* Auth (API-Key) für Schutz,
* Logging / Retry,
* UI / Web-Formular oder eine CLI,
* Dockerfile / systemd-Unit.

Was soll als Nächstes rein — z. B. API-Key Authentifizierung hinzufügen?
