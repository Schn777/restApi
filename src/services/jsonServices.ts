import fs from 'fs';
import path from 'path';
import logger from '../utils/logger';

export default class JsonData {

    public static getPath(fileName:string){
        return path.join(__dirname, '..', 'db', fileName);
    };

    public static async readJson(fileName:string): Promise<any[]> {
        try {
            const path = this.getPath(fileName);
            const fileContent = await fs.promises.readFile(path, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            logger.error(`Error reading or parsing JSON file: ${error}`);
            return [];
        }
    }

    public static async writeJson(fileName:string,data: any[]): Promise<any> {
        try {
            const list = await JsonData.readJson(fileName);
            const updatedList = [...list, ...data];
            const path = this.getPath(fileName);
            await fs.promises.writeFile(path, JSON.stringify(updatedList, null, 2));
            logger.info('Successfully wrote file');
            return data;
            
        } catch (error) {
            logger.error('Error writing file:', error);
        }
    }
    public static async delAllData(fileName:string): Promise<any> {
        try {
            const path = this.getPath(fileName);
            await fs.promises.writeFile(path,"");
            logger.info('Successfully delete file');
        } catch (error) {
            logger.error('Error deleting file:', error);
        }
    }
    public static async findOneById(id:number,fileName:string){
        try{
            const result = await this.readJson(fileName);
            const object = result.filter((obj) => obj.id == id);
            return object;
        }
        catch(error){
            logger.log("error while retreive by id", error);
        }
    }
    public static async deleteById(id:number, fileName:string) : Promise<boolean | Error>{
        try{
            const products = await this.readJson(fileName);
            const list = products.filter((prod)=> prod.id != id);
            if(list.length == products.length)
                throw new Error;  

            await this.delAllData(fileName);
            await this.writeJson(fileName, list);
            return true;
        }
        catch(error){
            logger.error("error while deleting object", error);
            throw new Error;
        }
        
    }
}
