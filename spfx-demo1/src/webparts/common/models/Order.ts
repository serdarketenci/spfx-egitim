import { IOrder } from ".";

export class Order implements IOrder {
    constructor(productId: string, quantity: number) {
        this.ProductId = productId;
        this.Quantity = quantity;
    }
    
    public ProductId: string;
    public Quantity: number;
}