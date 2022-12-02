import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Variant1Component } from './variant1.component';

describe('Variant1Component', () => {
  let component: Variant1Component;
  let fixture: ComponentFixture<Variant1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Variant1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Variant1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
