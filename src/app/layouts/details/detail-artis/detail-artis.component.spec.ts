import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailArtisComponent } from './detail-artis.component';

describe('DetailArtisComponent', () => {
  let component: DetailArtisComponent;
  let fixture: ComponentFixture<DetailArtisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailArtisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailArtisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
