import { Request, Response } from 'express';
import ProductService from '../services/product.services';

export class ProductController {
    static async getProducts(req: Request, res: Response) {
        try{
            const version = req.params.version
            const products = await ProductService.getAllProducts(version);
            res.status(200).json(products);
            
        }
        catch(error){
            res.status(400).json("Error invalid request");
        }
    }
    static async productPriceFilter(req: Request, res: Response) {
        try{
            const version = req.params.version
            const products = await ProductService.productsFilterPrice(version,req.body.minPrice, req.body.maxPrice);
            res.status(200).json(products);
            
        }
        catch(error){
            res.status(401);
        }
    }
    static async productStockFilter(req: Request, res: Response) {
        try{
            const version = req.params.version
            const products = await ProductService.productsFilterQte(version,req.body.minStock, req.body.maxStock);
            res.status(200).json(products);
            
        }
        catch(error){
            res.status(401);
        }
    }
    static async createProduct(req: Request, res: Response) {
        try{
            const version = req.params.version
            const {name,description,price,quantity } = req.body
            const products = await ProductService.createProduct(version,{name:name,description:description,price:price,quantity:quantity});
            if(!products){
                res.status(400).json({message : "Invalid fields"});
            }
            res.status(201).json(products);
        }
        catch(error){
            res.status(401).json({message : "User non authorize"});
        }
    }
    static async editProduct(req: Request, res: Response) {
        try{
            const reqParam = {id: req.params.id, version: req.params.version};

            const {name,description,price,quantity } = req.body;
            const product = await ProductService.editProduct(reqParam,{name,description,price,quantity});
            if(!product){
                res.status(400).json({message : "Invalid fields"});
            }
            res.status(200).json({message : reqParam.id + " Has been updated "});
        }
        catch(error){
            res.status(404).json({ message: 'Product not found'});
        }
    }
    static async deleteProduct(req: Request, res: Response) {
        try{
            const reqParam = {id: req.params.id, version: req.params.version};
            await ProductService.deleteProduct(reqParam);
            res.status(200).json({message:"Product " + req.params.id + " Has been deleting"});
        }
        catch(error){
            res.status(404).json({ message: 'Product not found'});
        }
    }
}
