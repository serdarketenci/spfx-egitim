import { IProduct } from ".";

export class Product implements IProduct {
    constructor(options: IProduct) {
        this.Id = options.Id;
        this.Title = options.Title;
        this.ImageUrl = options.ImageUrl;
        this.Price = options.Price;
    }

    public Id: number;
    public Title: string;
    public Price: number;
    public ImageUrl: string;
}