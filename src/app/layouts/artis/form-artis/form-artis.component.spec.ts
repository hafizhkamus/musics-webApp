import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArtisComponent } from './form-artis.component';

describe('FormArtisComponent', () => {
  let component: FormArtisComponent;
  let fixture: ComponentFixture<FormArtisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormArtisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArtisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
