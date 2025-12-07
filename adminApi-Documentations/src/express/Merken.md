### Reihenfolge der Endpunkte Middleware beachten
Die Reihenfolge, in der die Endpunkte/Middlewae mit app.use registirert werden, priorisiert deren handling.

Steht 
    app.use('/static', express.static(path.join(__dirname, 'public')));
zu beginn, werden die statischen Dateianfragen sofort ausgeliefert, noch bevor die Endpunkte abgehandelt werden (und deren authenifizierung)
D.h. die URL http://192.168.1.180:3000 würde direkt die statische index.hmtl aus dem Publick Ordner liefern, weil die app.use /static registrierung 
VOR der Endpunkt definition 
    app.get('/', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
steht.

Deshalb werden die statischen Dateien erst ganz am Ende registriert.

