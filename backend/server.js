const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/api/hello", (req, res) => {
  const dbConnectionString = process.env.AZURE_PARTIEL;

  if (dbConnectionString) {
    res.json({
      message:
        "Hello depuis Azure !  Le Back-end a bien récupéré le secret de la BDD depuis le Key Vault !",
    });
  } else {
    res.json({
      message:
        "Hello depuis Azure !  Erreur : Le secret du Key Vault est introuvable.",
    });
  }
});

app.listen(port, () => {
  console.log(`Back-end en cours d'exécution sur le port ${port}`);
});
