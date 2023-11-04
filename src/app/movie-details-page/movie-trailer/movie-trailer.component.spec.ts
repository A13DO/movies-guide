import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTrailerComponent } from './movie-trailer.component';

describe('MovieTrailerComponent', () => {
  let component: MovieTrailerComponent;
  let fixture: ComponentFixture<MovieTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTrailerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
