import mongoose from 'mongoose';
import GetAllData from './fetch.all.data';
import { config } from '../config/config';



export default class InitializeDb {
  static async connect() {
    console.log(config.ENV )
    var DB_URL:string;
    if(config.ENV == "test"){
      DB_URL = config.DB_URI_TEST || "";
    }
    else{
      DB_URL = config.DB_URI_PROD || ""
    }
    try {
      if(!DB_URL){
        throw new Error("URL not defined");
      }
      await mongoose.connect(DB_URL);
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      await GetAllData.initialize();
    } catch(error) {
      console.error("Erreur lors de la connexion au client MongoDB :", error);
    };
  }
  static async close(){
    await mongoose.disconnect();
  }

}

