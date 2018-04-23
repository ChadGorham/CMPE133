import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UnitService {

  //inject the firedatabase object
  constructor(private db: AngularFireDatabase) { }

  getUnits(){
    //use the second argument to tell how to sort this unit
    return this.db.list('/unit', {
      query: {
        orderByChild: 'name'
      }
    });
  }
}