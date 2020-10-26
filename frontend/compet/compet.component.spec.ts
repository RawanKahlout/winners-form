import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetComponent } from './compet.component';

describe('CompetComponent', () => {
  let component: CompetComponent;
  let fixture: ComponentFixture<CompetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
