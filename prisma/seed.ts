import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seed pharmaSen...');

  // ================================
  // Nettoyage de la base de données
  // ================================
  await prisma.garde.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.pharmacie.deleteMany();
  await prisma.utilisateur.deleteMany();
  await prisma.medicament.deleteMany();

  console.log('🗑️  Base de données nettoyée');

  // ================================
  // Création des médicaments
  // ================================
  const medicaments = await Promise.all([
    prisma.medicament.create({ data: { nomCommercial: 'Doliprane', nomGenerique: 'Paracétamol', description: 'Antidouleur et antipyrétique', categorie: 'Antidouleur' } }),
    prisma.medicament.create({ data: { nomCommercial: 'Amoxil', nomGenerique: 'Amoxicilline', description: 'Antibiotique à large spectre', categorie: 'Antibiotique' } }),
    prisma.medicament.create({ data: { nomCommercial: 'Coartem', nomGenerique: 'Artéméther/Luméfantrine', description: 'Traitement antipaludéen de première ligne', categorie: 'Antipaludéen' } }),
    prisma.medicament.create({ data: { nomCommercial: 'Ibuprofène', nomGenerique: 'Ibuprofène', description: 'Anti-inflammatoire non stéroïdien', categorie: 'Antidouleur' } }),
    prisma.medicament.create({ data: { nomCommercial: 'Quinine', nomGenerique: 'Quinine', description: 'Antipaludéen injectable', categorie: 'Antipaludéen' } }),
    prisma.medicament.create({ data: { nomCommercial: 'Augmentin', nomGenerique: 'Amoxicilline/Acide clavulanique', description: 'Antibiotique combiné', categorie: 'Antibiotique' } }),
    prisma.medicament.create({ data: { nomCommercial: 'Nivaquine', nomGenerique: 'Chloroquine', description: 'Antipaludéen et anti-inflammatoire', categorie: 'Antipaludéen' } }),
    prisma.medicament.create({ data: { nomCommercial: 'Metronidazole', nomGenerique: 'Métronidazole', description: 'Antibiotique et antiparasitaire', categorie: 'Antibiotique' } }),
    prisma.medicament.create({ data: { nomCommercial: 'Oméprazole', nomGenerique: 'Oméprazole', description: 'Inhibiteur de la pompe à protons', categorie: 'Gastro-entérologie' } }),
    prisma.medicament.create({ data: { nomCommercial: 'Ventoline', nomGenerique: 'Salbutamol', description: 'Bronchodilatateur', categorie: 'Respiratoire' } }),
    prisma.medicament.create({ data: { nomCommercial: 'Zinc', nomGenerique: 'Sulfate de zinc', description: 'Complément minéral', categorie: 'Complément' } }),
    prisma.medicament.create({ data: { nomCommercial: 'SRO', nomGenerique: 'Sels de réhydratation orale', description: 'Réhydratation en cas de diarrhée', categorie: 'Gastro-entérologie' } }),
  ]);

  console.log(`💊 ${medicaments.length} médicaments créés`);

  // ================================
  // Création des utilisateurs
  // ================================
  const motDePasseHash = await bcrypt.hash('pharmacien123', 12);
  const adminHash = await bcrypt.hash('admin123', 12);

  const admin = await prisma.utilisateur.create({
    data: {
      nom: 'Admin pharmaSen',
      email: 'admin@pharmasen.sn',
      motDePasse: adminHash,
      role: 'ADMIN',
    },
  });

  const pharmaciens = await Promise.all([
    prisma.utilisateur.create({ data: { nom: 'Moussa Diallo', email: 'moussa@pharmacie.sn', motDePasse: motDePasseHash, role: 'PHARMACIEN' } }),
    prisma.utilisateur.create({ data: { nom: 'Fatou Ndiaye', email: 'fatou@pharmacie.sn', motDePasse: motDePasseHash, role: 'PHARMACIEN' } }),
    prisma.utilisateur.create({ data: { nom: 'Ibrahima Sow', email: 'ibrahima@pharmacie.sn', motDePasse: motDePasseHash, role: 'PHARMACIEN' } }),
    prisma.utilisateur.create({ data: { nom: 'Aminata Diop', email: 'aminata@pharmacie.sn', motDePasse: motDePasseHash, role: 'PHARMACIEN' } }),
    prisma.utilisateur.create({ data: { nom: 'Ousmane Ba', email: 'ousmane@pharmacie.sn', motDePasse: motDePasseHash, role: 'PHARMACIEN' } }),
    prisma.utilisateur.create({ data: { nom: 'Rokhaya Fall', email: 'rokhaya@pharmacie.sn', motDePasse: motDePasseHash, role: 'PHARMACIEN' } }),
    prisma.utilisateur.create({ data: { nom: 'Cheikh Mbaye', email: 'cheikh@pharmacie.sn', motDePasse: motDePasseHash, role: 'PHARMACIEN' } }),
    prisma.utilisateur.create({ data: { nom: 'Aissatou Sarr', email: 'aissatou@pharmacie.sn', motDePasse: motDePasseHash, role: 'PHARMACIEN' } }),
  ]);

  console.log(`👤 ${pharmaciens.length + 1} utilisateurs créés`);

  // ================================
  // Création des pharmacies
  // ================================
  const pharmacies = await Promise.all([
    prisma.pharmacie.create({ data: { nom: 'Pharmacie du Plateau', adresse: '12 Avenue Léopold Sédar Senghor', quartier: 'Plateau', telephone: '338219050', latitude: 14.6937, longitude: -17.4441, horaires: 'Lun-Sam 08h-22h', estValidee: true, proprietaireId: pharmaciens[0].id } }),
    prisma.pharmacie.create({ data: { nom: 'Pharmacie de la Médina', adresse: '45 Rue 10, Médina', quartier: 'Médina', telephone: '338204070', latitude: 14.6915, longitude: -17.4476, horaires: 'Lun-Dim 08h-23h', estValidee: true, proprietaireId: pharmaciens[1].id } }),
    prisma.pharmacie.create({ data: { nom: 'Pharmacie Guédiawaye', adresse: '23 Avenue Cheikh Anta Diop, Guédiawaye', quartier: 'Guédiawaye', telephone: '338674512', latitude: 14.7769, longitude: -17.3994, horaires: 'Lun-Sam 08h-21h', estValidee: true, proprietaireId: pharmaciens[2].id } }),
    prisma.pharmacie.create({ data: { nom: 'Pharmacie des HLM', adresse: '7 Rue des HLM', quartier: 'HLM', telephone: '338325647', latitude: 14.7134, longitude: -17.4567, horaires: 'Lun-Sam 09h-21h', estValidee: true, proprietaireId: pharmaciens[3].id } }),
    prisma.pharmacie.create({ data: { nom: 'Pharmacie Sacré-Cœur', adresse: '34 Rue 10, Sacré-Cœur', quartier: 'Sacré-Cœur', telephone: '338692301', latitude: 14.7215, longitude: -17.4689, horaires: 'Lun-Dim 08h-22h', estValidee: true, proprietaireId: pharmaciens[4].id } }),
    prisma.pharmacie.create({ data: { nom: 'Pharmacie Liberté 6', adresse: '18 Avenue Bourguiba, Liberté 6', quartier: 'Liberté 6', telephone: '338241890', latitude: 14.7298, longitude: -17.4723, horaires: 'Lun-Sam 08h-22h', estValidee: true, proprietaireId: pharmaciens[5].id } }),
    prisma.pharmacie.create({ data: { nom: 'Pharmacie Pikine', adresse: '56 Rue Arafat, Pikine', quartier: 'Pikine', telephone: '338542310', latitude: 14.7512, longitude: -17.3912, horaires: 'Lun-Sam 08h-20h', estValidee: true, proprietaireId: pharmaciens[6].id } }),
    prisma.pharmacie.create({ data: { nom: 'Pharmacie Almadies', adresse: '9 Route des Almadies', quartier: 'Almadies', telephone: '338204589', latitude: 14.7456, longitude: -17.5234, horaires: 'Lun-Dim 09h-23h', estValidee: true, proprietaireId: pharmaciens[7].id } }),
  ]);

  console.log(`🏥 ${pharmacies.length} pharmacies créées`);

  // ================================
  // Création des stocks
  // ================================
  const stocksData = [
    // Pharmacie du Plateau
    { pharmacieId: pharmacies[0].id, medicamentId: medicaments[0].id, quantite: 150, prix: 1500, estDisponible: true },
    { pharmacieId: pharmacies[0].id, medicamentId: medicaments[1].id, quantite: 80, prix: 3500, estDisponible: true },
    { pharmacieId: pharmacies[0].id, medicamentId: medicaments[2].id, quantite: 60, prix: 5000, estDisponible: true },
    { pharmacieId: pharmacies[0].id, medicamentId: medicaments[3].id, quantite: 100, prix: 2000, estDisponible: true },
    { pharmacieId: pharmacies[0].id, medicamentId: medicaments[8].id, quantite: 45, prix: 2500, estDisponible: true },

    // Pharmacie de la Médina
    { pharmacieId: pharmacies[1].id, medicamentId: medicaments[0].id, quantite: 200, prix: 1200, estDisponible: true },
    { pharmacieId: pharmacies[1].id, medicamentId: medicaments[2].id, quantite: 40, prix: 4800, estDisponible: true },
    { pharmacieId: pharmacies[1].id, medicamentId: medicaments[4].id, quantite: 30, prix: 4500, estDisponible: true },
    { pharmacieId: pharmacies[1].id, medicamentId: medicaments[6].id, quantite: 55, prix: 1800, estDisponible: true },
    { pharmacieId: pharmacies[1].id, medicamentId: medicaments[11].id, quantite: 90, prix: 500, estDisponible: true },

    // Pharmacie Guédiawaye
    { pharmacieId: pharmacies[2].id, medicamentId: medicaments[0].id, quantite: 120, prix: 1400, estDisponible: true },
    { pharmacieId: pharmacies[2].id, medicamentId: medicaments[1].id, quantite: 50, prix: 3200, estDisponible: true },
    { pharmacieId: pharmacies[2].id, medicamentId: medicaments[5].id, quantite: 35, prix: 6500, estDisponible: true },
    { pharmacieId: pharmacies[2].id, medicamentId: medicaments[7].id, quantite: 70, prix: 1500, estDisponible: true },
    { pharmacieId: pharmacies[2].id, medicamentId: medicaments[10].id, quantite: 80, prix: 800, estDisponible: true },

    // Pharmacie des HLM
    { pharmacieId: pharmacies[3].id, medicamentId: medicaments[0].id, quantite: 90, prix: 1600, estDisponible: true },
    { pharmacieId: pharmacies[3].id, medicamentId: medicaments[2].id, quantite: 25, prix: 5200, estDisponible: true },
    { pharmacieId: pharmacies[3].id, medicamentId: medicaments[3].id, quantite: 60, prix: 1900, estDisponible: true },
    { pharmacieId: pharmacies[3].id, medicamentId: medicaments[9].id, quantite: 20, prix: 8500, estDisponible: true },

    // Pharmacie Sacré-Cœur
    { pharmacieId: pharmacies[4].id, medicamentId: medicaments[0].id, quantite: 180, prix: 1300, estDisponible: true },
    { pharmacieId: pharmacies[4].id, medicamentId: medicaments[1].id, quantite: 65, prix: 3800, estDisponible: true },
    { pharmacieId: pharmacies[4].id, medicamentId: medicaments[4].id, quantite: 15, prix: 4200, estDisponible: true },
    { pharmacieId: pharmacies[4].id, medicamentId: medicaments[5].id, quantite: 40, prix: 7000, estDisponible: true },
    { pharmacieId: pharmacies[4].id, medicamentId: medicaments[11].id, quantite: 110, prix: 450, estDisponible: true },

    // Pharmacie Liberté 6
    { pharmacieId: pharmacies[5].id, medicamentId: medicaments[0].id, quantite: 75, prix: 1550, estDisponible: true },
    { pharmacieId: pharmacies[5].id, medicamentId: medicaments[2].id, quantite: 50, prix: 4900, estDisponible: true },
    { pharmacieId: pharmacies[5].id, medicamentId: medicaments[6].id, quantite: 45, prix: 2000, estDisponible: true },
    { pharmacieId: pharmacies[5].id, medicamentId: medicaments[8].id, quantite: 30, prix: 2300, estDisponible: true },

    // Pharmacie Pikine
    { pharmacieId: pharmacies[6].id, medicamentId: medicaments[0].id, quantite: 100, prix: 1100, estDisponible: true },
    { pharmacieId: pharmacies[6].id, medicamentId: medicaments[1].id, quantite: 40, prix: 3000, estDisponible: true },
    { pharmacieId: pharmacies[6].id, medicamentId: medicaments[7].id, quantite: 55, prix: 1400, estDisponible: true },
    { pharmacieId: pharmacies[6].id, medicamentId: medicaments[10].id, quantite: 95, prix: 700, estDisponible: true },
    { pharmacieId: pharmacies[6].id, medicamentId: medicaments[11].id, quantite: 130, prix: 400, estDisponible: true },

    // Pharmacie Almadies
    { pharmacieId: pharmacies[7].id, medicamentId: medicaments[0].id, quantite: 200, prix: 1800, estDisponible: true },
    { pharmacieId: pharmacies[7].id, medicamentId: medicaments[2].id, quantite: 70, prix: 5500, estDisponible: true },
    { pharmacieId: pharmacies[7].id, medicamentId: medicaments[5].id, quantite: 50, prix: 7500, estDisponible: true },
    { pharmacieId: pharmacies[7].id, medicamentId: medicaments[9].id, quantite: 25, prix: 9000, estDisponible: true },
    { pharmacieId: pharmacies[7].id, medicamentId: medicaments[3].id, quantite: 80, prix: 2200, estDisponible: true },
  ];

  await prisma.stock.createMany({ data: stocksData });
  console.log(`📦 ${stocksData.length} stocks créés`);

  // ================================
  // Création des gardes
  // ================================
  const maintenant = new Date();
  const demain = new Date(maintenant);
  demain.setDate(maintenant.getDate() + 1);
  const apresdemain = new Date(maintenant);
  apresdemain.setDate(maintenant.getDate() + 2);

  await Promise.all([
    // Garde de nuit ce soir
    prisma.garde.create({ data: {
      pharmacieId: pharmacies[0].id,
      dateDebut: new Date(maintenant.toDateString() + ' 20:00:00'),
      dateFin: new Date(demain.toDateString() + ' 08:00:00'),
      typeGarde: 'NUIT',
    }}),
    // Garde de jour demain
    prisma.garde.create({ data: {
      pharmacieId: pharmacies[2].id,
      dateDebut: new Date(demain.toDateString() + ' 08:00:00'),
      dateFin: new Date(demain.toDateString() + ' 20:00:00'),
      typeGarde: 'JOUR',
    }}),
    // Garde de nuit demain
    prisma.garde.create({ data: {
      pharmacieId: pharmacies[4].id,
      dateDebut: new Date(demain.toDateString() + ' 20:00:00'),
      dateFin: new Date(apresdemain.toDateString() + ' 08:00:00'),
      typeGarde: 'NUIT',
    }}),
    // Garde de jour après-demain
    prisma.garde.create({ data: {
      pharmacieId: pharmacies[6].id,
      dateDebut: new Date(apresdemain.toDateString() + ' 08:00:00'),
      dateFin: new Date(apresdemain.toDateString() + ' 20:00:00'),
      typeGarde: 'JOUR',
    }}),
  ]);

  console.log('💂 4 gardes créées');
  console.log('✅ Seed terminé avec succès !');
  console.log('');
  console.log('📋 Comptes créés :');
  console.log('   Admin    → admin@pharmasen.sn / admin123');
  console.log('   Pharmaciens → motDePasse: pharmacien123');
}

main()
  .catch((e) => {
    console.error('❌ Erreur seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
