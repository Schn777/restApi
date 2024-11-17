import axios from 'axios';
import { Product } from '../models/product.model';
import JsonData from '../services/jsonServices';
import { User } from '../models/user.model';
import { hashPassword } from './security.utils';
import logger from './logger';
import ProductModel from '../models/mongo_schema/product.schema';
import UserModel from '../models/mongo_schema/user.schema';
import Regex from '../regex/regex';


export default class GetAllData {
    private static async fetchProducts(): Promise<void> {
        try {
            const response = await axios.get('https://fakestoreapi.com/products?limit=7');
            const products = response.data;
            const list: Product[] = [];

            for (const prod of products){
                const currentProd = new Product(
                    prod.title,
                    prod.category,
                    Math.floor(Math.random() * (200 - 1 + 1)),
                    prod.price,
                    prod.description
                );
                if(Regex.validateProduct(currentProd)){
                    list.push(currentProd);
                }
            }
            await ProductModel.insertMany(list);
            await JsonData.writeJson('product.json',list);

        } catch (error) {
            logger.log("Error while fetching products from fake store:", error);
        }
    }
    private static async fetchUser(): Promise<void>{
        try {
            const response = await axios.get('https://fakestoreapi.com/users?limit=5');
            const users = response.data;
            const list: User[] = [];

            for (const user of users){
                const curentUser = new User(
                    user.username,
                    user.email,
                    await hashPassword( user.password.trim()),
                    "employe",
                    false);
                list.push(curentUser);
            };
            await UserModel.insertMany(list);
            await JsonData.writeJson('user.json',list);

        } catch (error){
            logger.log("Error while fetching users from fake store:", error);
        }
    }
    public static async initialize(){
        try{
           await this.deleteAll();
           await this.fetchProducts();
           await this.fetchUser();
        }
        catch(error){
            logger.error("Failed to initialize JSON file");
            throw new Error(""+error);
        }
    }
    private static async deleteAll(){
        await JsonData.delAllData('user.json');
        await JsonData.delAllData('product.json');
        await UserModel.deleteMany({});
        await ProductModel.deleteMany({});
    }


}
