import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerProfileListComponent } from './player-profile-list.component';

describe('PlayerProfileListComponent', () => {
  let component: PlayerProfileListComponent;
  let fixture: ComponentFixture<PlayerProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerProfileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
