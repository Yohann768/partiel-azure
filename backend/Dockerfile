# On part d'une base Node.js légère
FROM node:18-alpine

# On crée un dossier /app dans le conteneur
WORKDIR /app

# On copie les fichiers de configuration
COPY package*.json ./

# On installe les dépendances
RUN npm install

# On copie tout le reste de ton code (le server.js)
COPY . .

# On indique le port utilisé
EXPOSE 3000

# La commande pour démarrer le serveur
CMD ["node", "server.js"]