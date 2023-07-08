import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/types/products.types';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  product: Product = {} as Product;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    const data = this.router.getCurrentNavigation()?.extras.state as any;
    this.product = data.product;
  }

  ngOnInit(): void {
  }

  submitForm(data: Product) {
    this.productService.updateProduct(data).subscribe(
      {
        next: (response) => {
          this.router.navigate(['/']);
        }
      }
    );
  }
}
