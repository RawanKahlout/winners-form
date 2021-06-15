import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWinnersFormComponent } from './edit-winners-form.component';

describe('EditWinnersFormComponent', () => {
  let component: EditWinnersFormComponent;
  let fixture: ComponentFixture<EditWinnersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWinnersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWinnersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
