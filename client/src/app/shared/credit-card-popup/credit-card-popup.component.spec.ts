import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardPopupComponent } from './credit-card-popup.component';

describe('CreditCardPopupComponent', () => {
  let component: CreditCardPopupComponent;
  let fixture: ComponentFixture<CreditCardPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
