import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LablesRekamanComponent } from './lables-rekaman.component';

describe('LablesRekamanComponent', () => {
  let component: LablesRekamanComponent;
  let fixture: ComponentFixture<LablesRekamanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LablesRekamanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LablesRekamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
