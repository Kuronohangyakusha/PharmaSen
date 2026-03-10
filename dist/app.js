"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = __importDefault(require("./config/prisma"));
const erreur_middleware_1 = require("./middlewares/erreur.middleware");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const medicament_routes_1 = __importDefault(require("./modules/medicament/medicament.routes"));
const pharmacie_routes_1 = __importDefault(require("./modules/pharmacie/pharmacie.routes"));
const stock_routes_1 = __importDefault(require("./modules/stock/stock.routes"));
const garde_routes_1 = __importDefault(require("./modules/garde/garde.routes"));
// Chargement des variables d'environnement
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares globaux
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGINE_AUTORISEE }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/api/stocks', stock_routes_1.default);
app.use('/api/gardes', garde_routes_1.default);
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/medicaments', medicament_routes_1.default);
app.use('/api/pharmacies', pharmacie_routes_1.default);
// Route de test
app.get('/', (req, res) => {
    res.json({ message: '💊 pharmaSen API is running !' });
});
// Middleware de gestion des erreurs (toujours en dernier)
app.use(erreur_middleware_1.gererErreurs);
// Démarrage du serveur
async function demarrerServeur() {
    try {
        await prisma_1.default.$connect();
        console.log('✅ Connexion base de données : OK');
        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur le port ${PORT}`);
        });
    }
    catch (erreur) {
        console.error('❌ Erreur connexion base de données :', erreur);
        process.exit(1);
    }
}
demarrerServeur();
exports.default = app;
//# sourceMappingURL=app.js.map