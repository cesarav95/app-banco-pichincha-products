import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductComponent } from './edit-product.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/types/products.types';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-form',
  template: ''
})
class ProductFormStubComponent {
  @Input() title: string = 'Titulo del formulario';
  @Input() mode: string = 'new'; // or edit;
  productForm: FormGroup = new FormGroup({});
  @Input() product: Product = {} as Product;
  @Output() submitForm = new EventEmitter();
}

let productService: jasmine.SpyObj<ProductService>;
let router: jasmine.SpyObj<Router>;
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate', 'getCurrentNavigation']);


describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  const productServiceSpy = jasmine.createSpyObj('ProductService', ['updateProduct']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductComponent, ProductFormStubComponent ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();

    const product = {
      id: 'prod02',
      name: 'Producto 02',
      description: 'Producto 02 tarjeta',
      date_release: '2023-07-08T16:45:33.560Z',
      date_revision: '2024-07-08T16:45:33.560Z',
      logo: ''
    };

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    router.getCurrentNavigation.and.returnValue({extras: {state: {product}}} as any)

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect when submit form success', () => {
    const product = {
      id: 'prod02',
      name: 'Producto 02',
      description: 'Producto 02 tarjeta',
      date_release: '2023-07-08T16:45:33.560Z',
      date_revision: '2024-07-08T16:45:33.560Z',
      logo: ''
    };

    productService.updateProduct.and.returnValue(of(product));
    component.submitForm(product);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
