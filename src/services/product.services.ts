import { Product } from "../models/product.model";
import ProductDto from "../payloads/dto/product.dto";
import Regex from "../regex/regex";
import JsonData from "./jsonServices";
import logger from "../utils/logger";

export default class ProductService{

    private static fileName = 'product.json';
    
    
    public static async getAllProducts():Promise<Product[] | Error>{
        try{
            const products:Product[] = await JsonData.readJson(this.fileName);
            logger.info("get all product");
            return products;
        }
        catch(error){
            logger.log("error fetching product ", error);
            throw new Error("error fetching product ");
        }
        
    }
    public static async productsFilterPrice(minPrice: number, maxPrice: number): Promise<Product[] | Error> {
        try{
            const result = await this.getAllProducts();
    
            if (result instanceof Error){
                return result;
            }
    
            const filteredProducts: Product[] = result.filter(
                (prod) => prod.price >= minPrice && prod.price <= maxPrice
            );
            return filteredProducts;
        }
        catch(error){
            logger.log("error fetching product by price", error);
            throw new Error("error fetching product by price");
        }
    }
    
    public static async productsFilterQte(minStock: number, maxStock: number):Promise<Product[] | Error>{
        try{
            const result = await this.getAllProducts();

          if(result instanceof Error){
            return result;
          }
          const filteredProducts: Product[] = result.filter(
            (prod) => prod.quantity >= minStock && prod.quantity <= maxStock 
          );
          return filteredProducts;
        }
        catch(error){
            logger.log("error fetching product by quantity left ", error);
            throw new Error("error fetching product by quantity left ");
        }
        
    }
    public static async createProduct(productDto : ProductDto):Promise<Product | null>{
        try{
            const error = new Error();
            if(Regex.validateProduct(productDto)){
                const product = new Product(
                    productDto.name,
                    null,
                    productDto.quantity,
                    productDto.price,
                    productDto.description
                  );
                const data = JsonData.writeJson(this.fileName,[product]);
                return data;
            
            }
            else{
                return null;
            }   
        }
        catch(error){
            logger.log("error creating product ", error)
            throw new Error ("error creating product ");
        }  
    };
    public static async editProduct(productDto: ProductDto):Promise<Product | null>{
        try{
            if(productDto.id === undefined){
                throw new Error
            }
            const result = await JsonData.findOneById(productDto.id,this.fileName);
            if(result === undefined){
                throw new Error;
            }
            const product = result[0]
            if(product){
                if(Regex.validateProduct(productDto)){
                    product.name = !productDto.name?product.name:productDto.name,
                    product.description = !productDto.description?product.description:productDto.description,
                    product.price = !productDto.price?product.price:productDto.price,
                    product.quantity = !productDto.quantity?product.quantity:productDto.quantity
                    await JsonData.deleteById(productDto.id,this.fileName);
                    await JsonData.writeJson(this.fileName,[product]);
                    return product;
                }
                else{
                    return null;
                }   
            }
            else{
                throw new Error ("product doesn't exists");
            }
        }
        catch(error){
            logger.log("error editing product ", error);
            throw new Error ("error editing product ");
        }
        
    }
    public static async deleteProduct(id: number):Promise<boolean | Error>{
        try{
            if(id === undefined){
                throw new Error
            }
            return await JsonData.deleteById(id, this.fileName);
        }
        catch(error){
            logger.log("error editing product ", error);
            throw new Error ("error editing product ");
        }
        
    }
}