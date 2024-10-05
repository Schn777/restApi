import app from './app';  // Importer l'application configurée
import 'dotenv/config';
import { config } from "./config/config";

app.listen(config.PORT, () => {
    console.log(`is running on https://localhost:${config.PORT}`);
});
