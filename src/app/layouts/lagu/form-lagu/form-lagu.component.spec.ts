import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLaguComponent } from './form-lagu.component';

describe('FormLaguComponent', () => {
  let component: FormLaguComponent;
  let fixture: ComponentFixture<FormLaguComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLaguComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLaguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
