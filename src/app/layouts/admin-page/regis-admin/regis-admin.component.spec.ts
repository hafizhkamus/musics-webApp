import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisAdminComponent } from './regis-admin.component';

describe('RegisAdminComponent', () => {
  let component: RegisAdminComponent;
  let fixture: ComponentFixture<RegisAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
