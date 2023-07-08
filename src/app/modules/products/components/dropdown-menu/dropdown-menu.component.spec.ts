import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuComponent } from './dropdown-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('DropdownMenuComponent', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownMenuComponent ],
      imports: [FontAwesomeModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set true expandedMenu when call expandMenu function', () => {
    component.expandedMenu = false;
    component.expandMenu();
    expect(component.expandedMenu).toBeTruthy();
  });

  it('should emit event editProduct when call funtion onEditProduct', () => {
    spyOn(component.editProduct, 'emit');
    component.onEditProduct();
    expect(component.editProduct.emit).toHaveBeenCalled();
  });

  it('should emit event deleteProduct when call funtion onDeleteProduct', () => {
    spyOn(component.deleteProduct, 'emit');
    component.onDeleteProduct();
    expect(component.deleteProduct.emit).toHaveBeenCalled();
  });

  it('should set false expandedMenu when click outside od component ', () => {
    component.expandedMenu = true;
    component.onClick(null);
    expect(component.expandedMenu).toBeFalsy();
  });
});
