import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollateButtonComponent } from './collate-button.component';

describe('CollateButtonComponent', () => {
  let component: CollateButtonComponent;
  let fixture: ComponentFixture<CollateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
