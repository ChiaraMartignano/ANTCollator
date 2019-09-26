import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmuflKeyboardComponent } from './smufl-keyboard.component';

describe('SmuflKeyboardComponent', () => {
  let component: SmuflKeyboardComponent;
  let fixture: ComponentFixture<SmuflKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmuflKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmuflKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
