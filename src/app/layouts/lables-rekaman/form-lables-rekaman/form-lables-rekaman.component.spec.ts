import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLablesRekamanComponent } from './form-lables-rekaman.component';

describe('FormLablesRekamanComponent', () => {
  let component: FormLablesRekamanComponent;
  let fixture: ComponentFixture<FormLablesRekamanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLablesRekamanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLablesRekamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
