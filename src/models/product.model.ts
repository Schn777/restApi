export class Product {
    private static increment: number = 0;
    id: number;

    name: string;

    category: string | null;

    quantity: number;

    price: number;

    description: string | null;  

    constructor(
        name: string,
        category: string | null,
        quantity: number,
        price: number,
        description: string | null
    ) {
        this.id = Product.increment;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.description = description;
        Product.increment++;
    }
}
