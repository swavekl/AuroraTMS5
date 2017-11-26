import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubNameAutoComponent } from './club-name-auto.component';

describe('ClubNameAutoComponent', () => {
  let component: ClubNameAutoComponent;
  let fixture: ComponentFixture<ClubNameAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubNameAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubNameAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
