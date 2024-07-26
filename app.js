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

app.use(express.json()); // To handle JSON payloads

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

app.post("/add", (req, res) => {
  const { a, b } = req.body;

  if (typeof a === 'number' && typeof b === 'number') {
    const sum = a + b;
    res.status(200).json({ sum });
    logger.info({
      message: "success method add",
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      timestamp: new Date().toISOString(),
    });
  } else { 
    res.status(500).json({ error: "Invalid input, it seems that one of the 2 input fields is not a number" });
    // Journaliser une erreur de validation
    logger.error({
      message: "Invalid input, it seems that one of the 2 input fields is not a number",
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      timestamp: new Date().toISOString(),
    });
  }
});

app.post("/multiply", (req, res) => {
  const { a, b } = req.body;

  if (typeof a === 'number' && typeof b === 'number') {
    const total = a * b;
    res.status(200).json({ total });
    logger.info({
      message: "success method mutiply",
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      timestamp: new Date().toISOString(),
    });
  } else { 
    res.status(500).json({ error: "Invalid input, it seems that one of the 2 input fields is not a number" });
    // Journaliser une erreur de validation
    logger.error({
      message: "Invalid input, it seems that one of the 2 input fields is not a number",
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      timestamp: new Date().toISOString(),
    });
  }
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
