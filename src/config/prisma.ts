// Instance unique du client Prisma pour toute l'application
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

export default prisma;