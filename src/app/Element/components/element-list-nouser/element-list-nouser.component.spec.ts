import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementListNouserComponent } from './element-list-nouser.component';

describe('ElementListNouserComponent', () => {
  let component: ElementListNouserComponent;
  let fixture: ComponentFixture<ElementListNouserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementListNouserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementListNouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
