import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaguComponent } from './lagu.component';

describe('LaguComponent', () => {
  let component: LaguComponent;
  let fixture: ComponentFixture<LaguComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaguComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
