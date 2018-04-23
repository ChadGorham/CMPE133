import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryService { 

  //inject the firedatabase object
  constructor(private db: AngularFireDatabase) { }

  getAll(){
    //use the second argument to tell how to sort this categories
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }
}
