import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.onChange({});
    component.onTouch();
    expect(component).toBeTruthy();
  });

  it('should emit event keyup when changing value', () => {
    spyOn(component.keyUp, 'emit');
    component.onKeyUp();
    expect(component.keyUp.emit).toHaveBeenCalled();
  });

  it('should call onChange function when change value', () => {
    spyOn(component, 'onChange');
    component.onChangeValue();
    expect(component.onChange).toHaveBeenCalled();
  });
});
