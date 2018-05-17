import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialsSearchComponent } from './officials-search.component';

describe('OfficialsSearchComponent', () => {
  let component: OfficialsSearchComponent;
  let fixture: ComponentFixture<OfficialsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
