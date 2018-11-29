import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountSettingsComponent } from './acount-settings.component';

describe('AcountSettingsComponent', () => {
  let component: AcountSettingsComponent;
  let fixture: ComponentFixture<AcountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
