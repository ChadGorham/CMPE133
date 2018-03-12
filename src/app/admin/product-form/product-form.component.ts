import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { UnitService } from '../../unit.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  units$;

  constructor(categoryService: CategoryService,
              unitService: UnitService ) {
    this.categories$ = categoryService.getCategories();
    this.units$ = unitService.getUnits();
  }

  ngOnInit() {
  }

}
