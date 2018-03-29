import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart{
    items: ShoppingCartItem[] = [];
    totalAmount;

    constructor(private itemsMap: { [productId:string]: ShoppingCartItem }){
        //initialize properly
        this.itemsMap = itemsMap || {};

        for(let productId in itemsMap){
            let item = itemsMap[productId];
            //pass as a json object
            let x = new ShoppingCartItem({
                // title: item.title,
                // imageUrl: item.imageUrl,
                // price: item.price,
                // unit: item.unit,

                //replace with flat operator for above code
                ...item,
                $key: productId
            });
            //copy all properties to a new object
            this.items.push(x);
        }
    }

    //below code is too much steps
    // get productIds(){
    //     return Object.keys(this.items);
    // }

    getQuantity(product: Product){
        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }

    get totalPrice(){
        this.totalAmount = 0;
        for (let productId in this.items){
            this.totalAmount += this.items[productId].totalPrice;
        }
        return this.totalAmount;
    }

    get totalItemsCount(){
        let count = 0;
        for (let productId in this.itemsMap){
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }
}