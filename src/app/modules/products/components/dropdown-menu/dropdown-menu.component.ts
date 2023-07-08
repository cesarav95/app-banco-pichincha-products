import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/shared/types/products.types';


@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  @Input() product : Product = {}  as Product;

  @Output() editProduct = new EventEmitter<Product>();

  @Output() deleteProduct = new EventEmitter<Product>();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickInside = this.el.nativeElement.contains(target);
    if (!clickInside) {
      this.expandedMenu = false;
    }
  }

  constructor(private el: ElementRef) {}


  faEllipsisVertical = faEllipsisVertical;

  expandedMenu = false;

  expandMenu() {
    this.expandedMenu = true;
  }

  onEditProduct() {
    this.editProduct.emit(this.product);
    this.expandedMenu = false;
  }

  onDeleteProduct() {
    this.deleteProduct.emit(this.product);
    this.expandedMenu = false;
  }

}
