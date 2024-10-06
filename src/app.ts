import express, { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import productRoutes from './routes/product.route';
import authRoutes from './routes/auth.route';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import AuthenticationFilter from './middlewares/auth.middleware';
import { config } from './config/config';
import GetAllData from './utils/fetch.all.data';
import logger from './utils/logger';
// Create an instance of AuthenticationFilter
const filter = new AuthenticationFilter();
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'A simple API to manage users',
    },
  },
  apis: ['./src/routes/*.route.ts'], // File where API routes are defined
};

// Generate documentation from options
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Fetch all data from fake store
GetAllData.initialize();

// Serve Swagger documentation at '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Basic route
app.get('/', async (req: Request, res: Response) => {
    try {
      res.json("welcome to RESTful API for Inventory Management");
    } catch (error) {
        logger.error("Error:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

app.use('/api/v1', authRoutes);
app.use('/api/v1',productRoutes);

// HTTPS server options
const httpsOptions: https.ServerOptions = {
  key: fs.readFileSync(path.resolve(__dirname, config.CERT_KEY || 'config/certificates/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, config.CERT_CERT ||'config/certificates/cert.pem')),
};

// Create and start the HTTPS server
try{
  const port = config.PORT;
  https.createServer(httpsOptions, app).listen(port, () => {
    logger.info(`Server is running on https://localhost:${port}`);
  });
}
catch(e){
  logger.warn(e);
}


export default app;
