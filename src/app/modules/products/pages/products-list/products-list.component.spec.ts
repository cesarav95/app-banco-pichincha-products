import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/shared/types/products.types';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-datatable',
  template: ''
})
export class ProductDatatableStubComponent {
  @Input() data: Product[] = [];
  @Output() deleteProduct = new EventEmitter();
}

let productService: jasmine.SpyObj<ProductService>;

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsListComponent, ProductDatatableStubComponent ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    productService.getProducts.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reload list when delete product success', () => {
    productService.deleteProduct.and.returnValue(of({}));
    spyOn(component, 'getAllProducts');
    component.deleteProduct({} as Product);
    expect(component.getAllProducts).toHaveBeenCalled();
  });
});
