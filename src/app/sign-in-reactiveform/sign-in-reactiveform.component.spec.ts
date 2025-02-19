import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInReactiveformComponent } from './sign-in-reactiveform.component';

describe('SignInReactiveformComponent', () => {
  let component: SignInReactiveformComponent;
  let fixture: ComponentFixture<SignInReactiveformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInReactiveformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInReactiveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
