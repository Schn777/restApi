import app from './app';  // Importer l'application configurée
import 'dotenv/config';
import { config } from "./config/config";
import logger from './utils/logger';

app.listen(config.PORT, () => {
    logger.info(`is running on https://localhost:${config.PORT}`);
});
