import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { DataTableColumn, Product } from 'src/app/shared/types/products.types';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent  implements OnInit{

  data: Product[] = [];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.data = response as Product[];
      }
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe({
      next: (response) => {
        this.getAllProducts();
      }
    });
  }

}
