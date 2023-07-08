import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDatatableComponent } from './product-datatable.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/types/products.types';

@Component({
  selector: 'app-dropdown-menu',
  template: ''
})
export class DropdownMenuStubComponent {}

@Component({
  selector: 'app-input',
  template: '',
})
export class InputStubComponent {}

describe('ProductDatatableComponent', () => {
  let component: ProductDatatableComponent;
  let fixture: ComponentFixture<ProductDatatableComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  beforeEach(async () => {


    await TestBed.configureTestingModule({
      declarations: [ ProductDatatableComponent, DropdownMenuStubComponent, InputStubComponent ],
      imports: [FormsModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search when ngOnChange component', () => {
    spyOn(component, 'search');
    component.ngOnChanges({});
    expect(component.search).toHaveBeenCalledWith('');
  });

  it('should filter product when call search function', () => {
    component.data = [
      {
        id: 'prod01',
        name: 'Producto 01',
        description: 'Producto 01 ',
        date_release: '',
        date_revision: '',
        logo: ''
      },
      {
        id: 'prod02',
        name: 'Producto 02',
        description: 'Producto 02 tarjeta',
        date_release: '',
        date_revision: '',
        logo: ''
      }
    ]

    const expectedData = [
      {
        id: 'prod02',
        name: 'Producto 02',
        description: 'Producto 02 tarjeta',
        date_release: '',
        date_revision: '',
        logo: ''
      }
    ]
    component.search('tarjeta');
    expect(component.datasource).toEqual(expectedData);
  });

  it('should navigate to products/new when call function addNewProduct', () => {
    const spy = routerSpy.navigate as jasmine.Spy;
    component.addNewProduct();
    expect(spy).toHaveBeenCalledWith(['products', 'new']);
  });

  it('should navigate to products/edit when call function editProduct', () => {
    const product = {
      id: 'prod02',
      name: 'Producto 02',
      description: 'Producto 02 tarjeta',
      date_release: '',
      date_revision: '',
      logo: ''
    };
    const spy = routerSpy.navigate as jasmine.Spy;
    component.editProduct(product);
    expect(spy).toHaveBeenCalledWith(['products', 'edit', product.id],{state: {product}});
  });

  it('should emit event deleteProduct when call funtion onDeleteProduct', () => {
    spyOn(component.deleteProduct, 'emit');
    component.onDeleteProduct( {} as Product);
    expect(component.deleteProduct.emit).toHaveBeenCalled();
  });

  it('should call search function when chanegPageSize', () => {
    spyOn(component, 'search');
    component.changePageSize();
    expect(component.search).toHaveBeenCalled();
  });

  it('should add one to current page when call nextPage function', () => {
    component.currentPage = 1;
    component.numPages = 6;
    component.nextPage();
    expect(component.currentPage).toEqual(2);
  });

  it('should less one to current page when call prevPage function', () => {
    component.currentPage = 4;
    component.numPages = 6;
    component.prevPage();
    expect(component.currentPage).toEqual(3);
  });

  it('should not add one if the pages is multiple by pageSize', () => {
    component.datasource = [{} as Product, {} as Product, {} as Product,{} as Product]
    component.pageSize = 2
    const result = component.calculateNumPages();
    expect(result).toEqual(2);
  });

});
