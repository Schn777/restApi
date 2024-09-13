import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
import authRoutes from "./routes/auth.route";
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import AuthenticationFilter from './middlewares/auth.middleware';

const filter = new AuthenticationFilter();
const app = express();
// Middleware de parsing du JSON
app.use(express.json());

const users = []; // Un tableau pour stocker des utilisateurs fictifs
const SECRET_KEY = 'votre_clé_secrète'; // Utilisée pour signer les JWT (garder cette clé sécurisée)

// Définir les options de Swagger
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'User API',
        version: '1.0.0',
        description: 'A simple API to manage users',
      },
    },
    apis: ['./src/routes/*.route.ts'], // Fichier où les routes de l'API sont définies
  };
  
// Générer la documentation à partir des options
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Servir la documentation Swagger via '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Autres routes et middleware Express
app.use(express.json());


// Route de base
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', filter.authFilter, productRoutes);

app.use(errorMiddleware);


export default app;
