import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { UnitService } from '../../shared/services/unit.service';
import { ProductService } from '../../shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take'; //only take one item from observable and complete it.

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  units$;
  product = {}; //initialize this to prevent null error in product-form.component.html
  id;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private unitService: UnitService,
              private productService: ProductService ) {
    this.categories$ = categoryService.getAll();
    this.units$ = unitService.getUnits();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).take(1).subscribe(p => this.product = p);
    }
  }

  save(product){
    //before save the product into database, make sure the object in a right shape
    //console.log(product);

    if(this.id){
      this.productService.updateProduct(this.id, product);
    }else{
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are sure you want to delete this product?')) return;
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);    
  }

  ngOnInit() {
  }

}
