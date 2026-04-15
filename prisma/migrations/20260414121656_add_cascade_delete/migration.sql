-- DropForeignKey
ALTER TABLE "Garde" DROP CONSTRAINT "Garde_pharmacieId_fkey";

-- DropForeignKey
ALTER TABLE "Pharmacie" DROP CONSTRAINT "Pharmacie_proprietaireId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_medicamentId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_pharmacieId_fkey";

-- AddForeignKey
ALTER TABLE "Pharmacie" ADD CONSTRAINT "Pharmacie_proprietaireId_fkey" FOREIGN KEY ("proprietaireId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_pharmacieId_fkey" FOREIGN KEY ("pharmacieId") REFERENCES "Pharmacie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_medicamentId_fkey" FOREIGN KEY ("medicamentId") REFERENCES "Medicament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garde" ADD CONSTRAINT "Garde_pharmacieId_fkey" FOREIGN KEY ("pharmacieId") REFERENCES "Pharmacie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
