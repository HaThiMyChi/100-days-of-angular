import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day026RxjsSubjectMulticastComponent } from './day026-rxjs-subject-multicast.component';

describe('Day026RxjsSubjectMulticastComponent', () => {
  let component: Day026RxjsSubjectMulticastComponent;
  let fixture: ComponentFixture<Day026RxjsSubjectMulticastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day026RxjsSubjectMulticastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day026RxjsSubjectMulticastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
