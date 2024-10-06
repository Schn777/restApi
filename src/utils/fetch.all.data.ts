import axios from 'axios';
import { Product } from '../models/product.model';
import JsonData from '../services/jsonServices';
import { User } from '../models/user.model';
import { hashPassword } from './security.utils';
import logger from './logger';

export default class GetAllData {
    private static async fetchProducts(): Promise<void> {
        try {
            JsonData.delAllData('product.json');
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
                list.push(currentProd);
            }
            await JsonData.writeJson('product.json',list);

        } catch (error) {
            logger.log("Error while fetching products from fake store:", error);
        }
    }
    private static async fetchUser(): Promise<void>{
        try {
            JsonData.delAllData('user.json');
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
            await JsonData.writeJson('user.json',list);

        } catch (error){
            logger.log("Error while fetching users from fake store:", error);
        }
    }
    public static async initialize(){
        try{
           await this.fetchProducts();
           await this.fetchUser();
        }
        catch(error){
            logger.error("Failed to initialize JSON file");
            throw new Error(""+error);
        }
    }
}
