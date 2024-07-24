const express = require("express");
const app = express();
const port = 3000;
const winston = require("winston");
const path = require("path");

// Configuration de winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, "app.log") }),
  ],
});

app.use((req, res, next) => {
  // Journaliser chaque requête
  logger.info({
    message: "HTTP Request",
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  });
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
  // Journaliser une réponse réussie
  logger.info({
    message: "Response sent",
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    // Journaliser le démarrage du serveur
    logger.info(`Server running at http://localhost:${port}`);
  });
}
