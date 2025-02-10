import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloObservablesComponent } from './hello-observables.component';

describe('HelloObservablesComponent', () => {
  let component: HelloObservablesComponent;
  let fixture: ComponentFixture<HelloObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelloObservablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
