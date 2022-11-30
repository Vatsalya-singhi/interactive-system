import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Variant2Component } from './variant2.component';

describe('Variant2Component', () => {
  let component: Variant2Component;
  let fixture: ComponentFixture<Variant2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Variant2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Variant2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
