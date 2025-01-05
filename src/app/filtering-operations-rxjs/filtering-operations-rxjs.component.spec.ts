import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringOperationsRxjsComponent } from './filtering-operations-rxjs.component';

describe('FilteringOperationsRxjsComponent', () => {
  let component: FilteringOperationsRxjsComponent;
  let fixture: ComponentFixture<FilteringOperationsRxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteringOperationsRxjsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteringOperationsRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
