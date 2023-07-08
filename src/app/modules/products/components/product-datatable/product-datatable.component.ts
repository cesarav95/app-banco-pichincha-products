import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataTableColumn, Product } from 'src/app/shared/types/products.types';

@Component({
  selector: 'app-product-datatable',
  templateUrl: './product-datatable.component.html',
  styleUrls: ['./product-datatable.component.scss']
})
export class ProductDatatableComponent implements OnChanges{
  @Input() data: Product[] = [];

  @Output() deleteProduct = new EventEmitter();

  datasource: Product[] = [];

  pageSize = 5;

  pageSizeOptions = [5, 10, 15, 20, 1];

  currentPage = 1;

  searchFilter = '';

  numPages = 1;


  columns: DataTableColumn[] = [
    {
      field: 'logo',
      name: 'Logo'
    },
    {
      field: 'name',
      name: 'Nombre del Producto'
    },
    {
      field: 'description',
      name: 'Descripcion'
    },
    {
      field: 'date_release',
      name: 'Fecha de Liberacion'
    },
    {
      field: 'date_revision',
      name: 'Fecha de Reestructuracion'
    },
    {
      field: '',
      name: ''
    }

  ];

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {

  }

  ngOnChanges(changes: any): void {
    this.search('');
  }

  search(value: any) {
    this.datasource = this.data.filter(
      product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase())
    );
    this.searchFilter = value;

    const fromIndex = (this.currentPage - 1) * this.pageSize;
    const toIndex = fromIndex + this.pageSize;

    this.datasource = this.datasource.slice(fromIndex, toIndex);
    this.numPages = this.calculateNumPages();
  }

  calculateNumPages() {
    return Math.floor(this.datasource.length / this.pageSize) + ((this.datasource.length % this.pageSize)  === 0 ? 0 : 1);
  }

  addNewProduct() {
    this.router.navigate(['products', 'new'])
  }

  editProduct(product: Product) {
    this.router.navigate(['products', 'edit', `${product.id}`], {state: {product}})
  }

  onDeleteProduct(product: Product) {
    this.deleteProduct.emit(product);
  }

  changePageSize() {
    console.log('CANGE PAGE SZE');
    this.search(this.searchFilter);
  }

  nextPage() {
    if (this.currentPage < this.numPages) {
      this.currentPage++;
    }
    console.log(this.currentPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
