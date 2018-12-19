import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadderBoardComponent } from './ladder-board.component';

describe('LadderBoardComponent', () => {
  let component: LadderBoardComponent;
  let fixture: ComponentFixture<LadderBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadderBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadderBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
