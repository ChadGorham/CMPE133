import { ShoppingCart } from "./shopping-carts";

export class Order{
    datePlaced: number;
    items: any[];
    totalAmount = 0;

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart)
    {
        this.datePlaced = new Date().getTime();

        // was originally shoppingCart.totalAmount
        // but for some reasons, it's not working
        this.totalAmount = shoppingCart.totalPrice;
        

        console.log(this.totalAmount)

        this.items = shoppingCart.items.map(i =>{
            return {
                product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice,
            }
            })
        }
    }