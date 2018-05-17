import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerProfileEditComponent } from './player-profile-edit.component';

describe('PlayerProfileEditComponent', () => {
  let component: PlayerProfileEditComponent;
  let fixture: ComponentFixture<PlayerProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
