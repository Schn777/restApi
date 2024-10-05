import { Request, Response } from 'express';
import ProductService from '../services/product.services';
import { error } from 'console';

export class ProductController {
    static async getProducts(req: Request, res: Response) {
        try{
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
            
        }
        catch(error){
            res.status(400).json("Error invalid request");
        }
    }
    static async productPriceFilter(req: Request, res: Response) {
        try{
            const products = await ProductService.productsFilterPrice(req.body.minPrice, req.body.maxPrice);
            console.log(products)
            res.status(200).json(products);
            
        }
        catch(error){
            res.status(401);
        }
    }
    static async productStockFilter(req: Request, res: Response) {
        try{
            const products = await ProductService.productsFilterQte(req.body.minStock, req.body.maxStock);
            console.log(products)
            res.status(200).json(products);
            
        }
        catch(error){
            res.status(401);
        }
    }
    static async createProduct(req: Request, res: Response) {
        try{
            const {name,description,price,quantity } = req.body
            const products = await ProductService.createProduct({name:name,description:description,price:price,quantity:quantity});
            console.log(products)
            if(!products){
                res.status(400).json({message : "Invalid fields"});
            }
            res.status(201).json(products);   
        }
        catch(error){
            console.log(error);
            res.status(401).json({message : "User non authorize"});
        }
    }
    static async editProduct(req: Request, res: Response) {
        try{
            const {id,name,description,price,quantity } = req.body;
            const product = await ProductService.editProduct({id,name,description,price,quantity});
            if(!product){
                res.status(400).json({message : "Invalid fields"});
            }
            res.status(200).json({message : id + " Has been updated "});
        }
        catch(error){
            console.error("Operation failed");
            res.status(404).json({ message: 'Product not found'});
        }
    }
    static async deleteProduct(req: Request, res: Response) {
        try{
            await ProductService.deleteProduct(req.body.id);
            res.status(204).send({message:"Product " + req.body.id + " Has been deleting"});
        }
        catch(error){
            console.error("Operation failed");
            res.status(404).json({ message: 'Product not found'});
        }
    }
}
