import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMaterialComponent } from './course-material.component';

describe('CourseMaterialComponent', () => {
  let component: CourseMaterialComponent;
  let fixture: ComponentFixture<CourseMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
