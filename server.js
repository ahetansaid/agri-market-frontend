// Serveur Next.js personnalisé pour l'hébergement cPanel / Passenger (n0c).
// cPanel « Setup Node.js App » exécute ce fichier comme point d'entrée
// (« Application startup file » = server.js).
//
// Prérequis : `npm install` puis `npm run build` doivent avoir été exécutés
// (le dossier .next doit exister).

const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "0.0.0.0";

const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`> Next.js prêt sur http://${hostname}:${port}`);
  });
});
