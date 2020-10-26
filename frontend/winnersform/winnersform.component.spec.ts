import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersformComponent } from './winnersform.component';

describe('WinnersformComponent', () => {
  let component: WinnersformComponent;
  let fixture: ComponentFixture<WinnersformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnersformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnersformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
