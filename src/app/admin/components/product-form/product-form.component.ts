import { UnitService } from './../../../unit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

// do not need explicitly unsubsrcibe
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  units$;

  // set it to empty object so when the system retrieved product
  // it won't show null reference
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private unitService: UnitService,
    private productService: ProductService) {
    
    this.categories$ = categoryService.getAll();
    this.units$ = unitService.getUnits();
  
    // retrieve id of product from the address 
    this.id = this.route.snapshot.paramMap.get('id');
    
    // noted that only takes one item, so we don't need to unsubscribe
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
  }

  save(product)
  {
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    
    // console.log(product);
    this.router.navigate(['/admin/products']);
  }

  delete()
  {
    // simple javascript confirm box
    if(confirm('Are you sure you want to delete this product?'))
    {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
  ngOnInit() {
  }

}
