const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// On autorise le front-end à communiquer avec le back-end
app.use(cors());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello depuis le Back-end Node.js !" });
});

app.listen(port, () => {
  console.log(`Back-end en cours d'exécution sur le port ${port}`);
});
