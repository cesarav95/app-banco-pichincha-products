import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductDatatableComponent } from './components/product-datatable/product-datatable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    NewProductComponent,
    EditProductComponent,
    ProductFormComponent,
    ProductDatatableComponent,
    DropdownMenuComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule
  ]
})
export class ProductsModule { }
