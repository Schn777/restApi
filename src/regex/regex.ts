import ProductDto from "../payloads/dto/product.dto";

export default class Regex{

    public static validateProduct(productDto : ProductDto) {
        const nameRegex = /^[\w\s\S]{3,50}$/;
        const priceRegex = /^(0|[1-9]\d*)(\.\d+)?$/;
        const quantityRegex = /^[1-9]\d*$/;
        const isNameValid = nameRegex.test(productDto.name);
        const isPriceValid = priceRegex.test(productDto.price.toString());
        const isQuantityValid = quantityRegex.test(productDto.quantity.toString());
        
        return isNameValid && isPriceValid && isQuantityValid
    }
    public static validateUser(email : string){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    
}