import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpTestComponent } from './tmp-test.component';

describe('TmpTestComponent', () => {
  let component: TmpTestComponent;
  let fixture: ComponentFixture<TmpTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmpTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmpTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
