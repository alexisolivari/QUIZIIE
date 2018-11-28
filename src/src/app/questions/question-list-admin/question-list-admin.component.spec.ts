import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListAdminComponent } from './question-list-admin.component';

describe('QuestionListAdminComponent', () => {
  let component: QuestionListAdminComponent;
  let fixture: ComponentFixture<QuestionListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
