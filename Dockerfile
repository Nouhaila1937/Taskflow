# Utilisation de l'image de base Node.js
FROM node:16

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["npm", "start"]
