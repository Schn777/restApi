import { Product } from "../models/product.model";
import ProductDto from "../payloads/dto/product.dto";
import Regex from "../regex/regex";
import JsonData from "./jsonServices";
import logger from "../utils/logger";
import ProductModel from "../models/mongo_schema/product.schema";

export default class ProductService {

    private static fileName = 'product.json';


    public static async getAllProducts(version: any): Promise<Product[] | Error> {
        try {
            let products: Product[];
            if (version == "1") {
                products = await JsonData.readJson(this.fileName);
            }
            else {
                products = await ProductModel.find({});
            }
            logger.info("get all product");
            return products;
        }
        catch (error) {
            logger.log("error fetching product ", error);
            throw new Error("error fetching product ");
        }

    };
    public static async productsFilterPrice(version: any, minPrice: number, maxPrice: number): Promise<Product[] | Error> {
        try {
            const result = await this.getAllProducts(version);

            if (result instanceof Error) {
                return result;
            }

            const filteredProducts: Product[] = result.filter(
                (prod) => prod.price >= minPrice && prod.price <= maxPrice
            );
            return filteredProducts;
        }
        catch (error) {
            logger.log("error fetching product by price", error);
            throw new Error("error fetching product by price");
        }
    };

    public static async productsFilterQte(version: any, minStock: number, maxStock: number): Promise<Product[] | Error> {
        try {
            const result = await this.getAllProducts(version);

            if (result instanceof Error) {
                return result;
            }
            const filteredProducts: Product[] = result.filter(
                (prod) => prod.quantity >= minStock && prod.quantity <= maxStock
            );
            return filteredProducts;
        }
        catch (error) {
            logger.log("error fetching product by quantity left ", error);
            throw new Error("error fetching product by quantity left ");
        }

    };
    public static async createProduct(version: any, productDto: ProductDto): Promise<Product | null> {
        try {
            const error = new Error();
            if (!Regex.validateProduct(productDto)) {
                return null;
            }
            else {
                const product = new Product(
                    productDto.name,
                    null,
                    productDto.quantity,
                    productDto.price,
                    productDto.description
                );
                if (version == "1") {
                    return JsonData.writeJson(this.fileName, [product]);
                }
                else {
                    return ProductModel.create(product);
                }
            }
        }
        catch (error) {
            logger.log("error creating product ", error)
            throw new Error("error creating product ");
        }
    };
    public static async editProduct(reqParam: any, productDto: ProductDto): Promise<any> {
        try {
            if (reqParam.version == "2") {
                return await this.editMongoProduct(reqParam.id,productDto);
            }
            else {
                const result = await JsonData.findOneById(reqParam.id, this.fileName);
                if (result === undefined) {
                    throw new Error;
                }
                const product = result[0]
                if (product) {
                    if (Regex.validateProduct(productDto)) {
                        product.name = !productDto.name ? product.name : productDto.name,
                            product.description = !productDto.description ? product.description : productDto.description,
                            product.price = !productDto.price ? product.price : productDto.price,
                            product.quantity = !productDto.quantity ? product.quantity : productDto.quantity
                        await JsonData.deleteById(reqParam.id, this.fileName);
                        await JsonData.writeJson(this.fileName, [product]);
                        return product;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    throw new Error("product doesn't exists");
                }
            }

        }
        catch (error) {
            logger.log("error editing product ", error);
            throw new Error("error editing product ");
        }

    };
    public static async editMongoProduct(id : any,productDto: ProductDto) : Promise<any> {
        const result = await ProductModel.updateOne({ id:id }, {$set:{...productDto}})
        return result.modifiedCount;
    };
    public static async deleteProduct(reqParam:any): Promise<boolean | Error> {
        try {
            if (reqParam.id === undefined) {
                throw new Error;
            }
            if(reqParam.version == "1"){
                return await JsonData.deleteById(reqParam.id, this.fileName);
            }
            else{
               const result = await ProductModel.deleteOne({id:reqParam.id});
               return result.acknowledged;
            }
        }
        catch (error) {
            logger.log("error editing product ", error);
            throw new Error("error editing product ");
        }
    };
}