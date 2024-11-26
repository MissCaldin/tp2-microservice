# Étape unique : Utilisation de Node.js pour la construction et le service
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Construire les fichiers de production
RUN npm run build

# Installer un serveur statique léger pour servir le contenu
RUN npm install -g serve



# Exposer le port par défaut de `serve`
EXPOSE 3000

# Commande par défaut pour démarrer le serveur
CMD ["serve", "-s", "build"]
