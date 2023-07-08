import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/types/products.types';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit{
  product: Product = {} as Product;

  productForm = new FormGroup({});

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.createForm();
  }

  createForm(): FormGroup {
    const newForm = new FormGroup({
      id: new FormControl(
        { value: 'idproduct', disabled: false},
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10)
        ]),
      name: new FormControl({ value: '', disabled: false }, [Validators.required]),
      logo: new FormControl({ value: '', disabled: false }, [Validators.required]),
      description: new FormControl({ value: '', disabled: false }, [Validators.required]),
      date_release: new FormControl({ value: '', disabled: false }, [Validators.required]),
      date_revision: new FormControl({ value: '', disabled: true })
    });

    return newForm;
  }

  submitForm(data: Product) {
    console.log(data);
    this.productService.sendProduct(data).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      }
    });
  }
}
