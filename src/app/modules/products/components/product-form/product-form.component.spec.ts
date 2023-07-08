import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFormComponent ],
      imports: [ReactiveFormsModule, FormsModule, SharedModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format date_release and date_revision if mode form is edit', () => {
    component.mode = 'edit';
    component.product = {
      id: 'prod02',
      name: 'Producto 02',
      description: 'Producto 02 tarjeta',
      date_release: '2023-07-08T16:45:33.560Z',
      date_revision: '2024-07-08T16:45:33.560Z',
      logo: ''
    };
    component.ngOnInit();
    expect(component.product.date_release).toEqual('2023-07-08');
    expect(component.product.date_revision).toEqual('2024-07-08');
  });

  it('should set date_revision when change date_release', () => {
    component.onChangeRelease({target: {value: '2023-07-08'}});
    expect(component.productForm.get('date_revision')?.value).toEqual('2024-07-08');
  });

  it('should emit event submitForm when call sendData function', () => {
    spyOn(component.submitForm, 'emit');
    component.sendData()
    expect(component.submitForm.emit).toHaveBeenCalled();
  });

  it('should reset productForm when call restartForm function', () => {
    spyOn(component.productForm, 'reset');
    component.restartForm()
    expect(component.productForm.reset).toHaveBeenCalled();
  });
});
