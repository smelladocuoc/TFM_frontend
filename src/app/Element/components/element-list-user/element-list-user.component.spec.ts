import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementListUserComponent } from './element-list-user.component';

describe('ElementListUserComponent', () => {
  let component: ElementListUserComponent;
  let fixture: ComponentFixture<ElementListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementListUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
