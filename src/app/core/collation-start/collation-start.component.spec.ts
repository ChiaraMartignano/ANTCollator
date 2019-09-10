import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollationStartComponent } from './collation-start.component';

describe('CollationStartComponent', () => {
  let component: CollationStartComponent;
  let fixture: ComponentFixture<CollationStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollationStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollationStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
