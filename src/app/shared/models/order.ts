import { ShoppingCart } from "./shopping-carts";

export class Order{
    datePlaced: number;
    items: any[];
    totalAmount = 0;
    purchasePrice = 0;

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart)
    {
        this.datePlaced = new Date().getTime();

        // was originally shoppingCart.totalAmount
        // but for some reasons, it's not working
        this.totalAmount = shoppingCart.totalPrice;
        // jun, hold the discounted price or the original price, show in the order details
        this.purchasePrice = shoppingCart.totalPrice;
        

        console.log(this.totalAmount)

        this.items = shoppingCart.items.map(i =>{
            return {
                product: {
                    title: i.title,
                    imageUrl: i.imageUrl,
                    price: i.price,
                    //jun
                    key: i.$key
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice,
            }
            })
        }
    }