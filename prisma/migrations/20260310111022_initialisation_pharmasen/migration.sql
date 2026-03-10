-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VISITEUR', 'PHARMACIEN', 'ADMIN');

-- CreateEnum
CREATE TYPE "TypeGarde" AS ENUM ('JOUR', 'NUIT');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VISITEUR',
    "estActif" BOOLEAN NOT NULL DEFAULT true,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateMaj" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pharmacie" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "quartier" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "horaires" TEXT NOT NULL,
    "estValidee" BOOLEAN NOT NULL DEFAULT false,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateMaj" TIMESTAMP(3) NOT NULL,
    "proprietaireId" TEXT NOT NULL,

    CONSTRAINT "Pharmacie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicament" (
    "id" TEXT NOT NULL,
    "nomCommercial" TEXT NOT NULL,
    "nomGenerique" TEXT NOT NULL,
    "description" TEXT,
    "categorie" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateMaj" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL DEFAULT 0,
    "prix" DOUBLE PRECISION NOT NULL,
    "estDisponible" BOOLEAN NOT NULL DEFAULT true,
    "dateMaj" TIMESTAMP(3) NOT NULL,
    "pharmacieId" TEXT NOT NULL,
    "medicamentId" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garde" (
    "id" TEXT NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "typeGarde" "TypeGarde" NOT NULL DEFAULT 'JOUR',
    "pharmacieId" TEXT NOT NULL,

    CONSTRAINT "Garde_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacie_proprietaireId_key" ON "Pharmacie"("proprietaireId");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_pharmacieId_medicamentId_key" ON "Stock"("pharmacieId", "medicamentId");

-- AddForeignKey
ALTER TABLE "Pharmacie" ADD CONSTRAINT "Pharmacie_proprietaireId_fkey" FOREIGN KEY ("proprietaireId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_pharmacieId_fkey" FOREIGN KEY ("pharmacieId") REFERENCES "Pharmacie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_medicamentId_fkey" FOREIGN KEY ("medicamentId") REFERENCES "Medicament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garde" ADD CONSTRAINT "Garde_pharmacieId_fkey" FOREIGN KEY ("pharmacieId") REFERENCES "Pharmacie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
