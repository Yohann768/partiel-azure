const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
const sql = require("mssql");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let pool;

async function getDbConnection() {
  const credential = new DefaultAzureCredential();
  const client = new SecretClient(
    "https://k-partiel-azure1.vault.azure.net/",
    credential,
  );
  const secret = await client.getSecret("DB-AZRUE");
  pool = await sql.connect(secret.value);
  console.log("✅ Connecté à la base de données !");
}

// Route de test (prouve que front → back → BDD fonctionne)
app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.request().query("SELECT 1 AS ok");
    res.json({ status: "ok", db: result.recordset });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/hello", async (req, res) => {
  try {
    const result = await pool.request().query("SELECT 1 AS ok");
    res.json({ message: "✅ Connexion BDD réussie !" });
  } catch (err) {
    res.status(500).json({ message: "❌ Erreur BDD : " + err.message });
  }
});

const PORT = process.env.PORT || 3000;
getDbConnection().then(() => {
  app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
});
