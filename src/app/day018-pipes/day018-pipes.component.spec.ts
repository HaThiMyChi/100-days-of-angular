import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day018PipesComponent } from './day018-pipes.component';

describe('Day018PipesComponent', () => {
  let component: Day018PipesComponent;
  let fixture: ComponentFixture<Day018PipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day018PipesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day018PipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
