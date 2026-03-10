"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Instance unique du client Prisma pour toute l'application
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ['error', 'warn'],
});
exports.default = prisma;
//# sourceMappingURL=prisma.js.map