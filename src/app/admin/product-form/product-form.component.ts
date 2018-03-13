import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { UnitService } from '../../unit.service';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  units$;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private unitService: UnitService,
              private productService: ProductService ) {
    this.categories$ = categoryService.getCategories();
    this.units$ = unitService.getUnits();
  }

  save(product){
    //before save the product into database, make sure the object in a right shape
    //console.log(product);

    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
