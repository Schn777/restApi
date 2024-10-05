import fs from 'fs';
import path from 'path';
import { Product } from '../models/product.model';
import e from 'express';

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
            console.error(`Error reading or parsing JSON file: ${error}`);
            return [];
        }
    }

    public static async writeJson(fileName:string,data: any[]): Promise<any> {
        try {
            const list = await JsonData.readJson(fileName);
            const updatedList = [...list, ...data];
            const path = this.getPath(fileName);
            await fs.promises.writeFile(path, JSON.stringify(updatedList, null, 2));
            console.log('Successfully wrote file');
            return data;
            
        } catch (error) {
            console.error('Error writing file:', error);
        }
    }
    public static async delAllData(fileName:string): Promise<any> {
        try {
            const path = this.getPath(fileName);
            await fs.promises.writeFile(path,"");
            console.log('Successfully delete file');
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }
    public static async findOneById(id:number,fileName:string){
        try{
            const result = await this.readJson(fileName);
            const object = result.filter((obj) => obj.id == id);
            return object;
        }
        catch(error){
            console.log("error while retreive by id", error);
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
            console.error("error while deleting object", error);
            throw new Error;
        }
        
    }
}
