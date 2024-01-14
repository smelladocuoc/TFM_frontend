import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementChartsComponent } from './element-charts.component';

describe('ElementChartsComponent', () => {
  let component: ElementChartsComponent;
  let fixture: ComponentFixture<ElementChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
