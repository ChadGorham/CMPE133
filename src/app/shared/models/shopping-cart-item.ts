import { Product } from "./product";

export class ShoppingCartItem{
    $key: string
    title: string;
    imageUrl: string;
    price: number;
    salePrice: number;
    quantity: number;
   
    // Make init optional
    // init will have an object that is like shoppingcart item
    constructor(init?: Partial<ShoppingCartItem>)
    {
        Object.assign(this, init);
    }

    get totalPrice()
    {
        return this.price * this.quantity;
    }
}