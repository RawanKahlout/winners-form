import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersDataComponent } from './winners-data.component';

describe('WinnersDataComponent', () => {
  let component: WinnersDataComponent;
  let fixture: ComponentFixture<WinnersDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnersDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
