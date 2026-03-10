# ================================
# Étape 1 : Construction du projet
# ================================
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Installer toutes les dépendances
RUN npm install

# Générer le client Prisma
RUN npx prisma generate

# Copier le code source
COPY src ./src

# Compiler TypeScript en JavaScript
RUN npm run build

# ================================
# Étape 2 : Image de production
# ================================
FROM node:20-alpine AS production

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installer uniquement les dépendances de production
RUN npm install --omit=dev

# Générer le client Prisma
RUN npx prisma generate

# Copier le build depuis l'étape précédente
COPY --from=builder /app/dist ./dist

# Exposer le port de l'application
EXPOSE 3000

# Commande de démarrage
CMD ["node", "dist/app.js"]
