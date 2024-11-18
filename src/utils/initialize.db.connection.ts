import mongoose from 'mongoose';
import GetAllData from './fetch.all.data';
import { config } from '../config/config';



export default class InitializeDb {
  static async connect() {
    var DB_URL:string;

    DB_URL = config.ENV == "test"?
              config.DB_URI_TEST || "":
              config.DB_URI_PROD || ""
    
    try {
      if(!DB_URL){
        throw new Error("URL not defined");
      }
      await mongoose.connect(DB_URL);
      await GetAllData.initialize();
    } catch(error) {
      throw new Error(`Erreur lors de la connexion au client MongoDB : ${error}`);
    };
  }
  static async close(){
    await mongoose.disconnect();
  }

}

