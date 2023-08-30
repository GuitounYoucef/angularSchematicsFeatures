import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleFeatureComponent } from './simple-feature.component';

describe('SimpleFeatureComponent', () => {
  let component: SimpleFeatureComponent;
  let fixture: ComponentFixture<SimpleFeatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleFeatureComponent]
    });
    fixture = TestBed.createComponent(SimpleFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
