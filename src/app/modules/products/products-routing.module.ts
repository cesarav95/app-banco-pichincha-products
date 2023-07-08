import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ProductsListComponent
  },
  {
    path: 'new',
    component: NewProductComponent
  },
  {
    path: 'edit/:id',
    component: EditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
