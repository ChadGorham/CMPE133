import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart{

  items: ShoppingCartItem[] = [];
  totalAmount;
  
  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) 
  {
    console.log("itemsMap", itemsMap);
    // Make sure the imtesMap is initialized properly
    // instead of null
    this.itemsMap = itemsMap || {};

    // Create shopping cart items with variable in "items" variable
    for(let productId in itemsMap) {
      let item = itemsMap[productId]
      
      // Checking if the product is currently on sale
      if(item.salePrice !== 0)
        item.price = item.salePrice;
      
      this.items.push(new ShoppingCartItem({...item, $key: productId}));   
    }
  }

  // Asking the shopping cart what is the quantitty of this product
  getQuantity(product: Product)
  {
    let item = this.itemsMap[product.$key];
    // if there is an item in quantity, return quantity amount
    // else return 0
    return item ? item.quantity : 0;
  }

  get totalPrice()
  {
    this.totalAmount = 0;
    for(let productId in this.items)
    {
      this.totalAmount +=this.items[productId].totalPrice;
    }
    return this.totalAmount;

    // let sum = 0;
    // for(let productId in this.items)
    //   sum +=this.items[productId].totalPrice;
    // return sum;

  }

  // calculate the total number of items in shopping cart
  get totalItemsCount()
  {
    let count = 0;
    for(let productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;
    return count;
  }
}