import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleHigherOrderObservablesComponent } from './example-higher-order-observables.component';

describe('ExampleHigherOrderObservablesComponent', () => {
  let component: ExampleHigherOrderObservablesComponent;
  let fixture: ComponentFixture<ExampleHigherOrderObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleHigherOrderObservablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleHigherOrderObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
