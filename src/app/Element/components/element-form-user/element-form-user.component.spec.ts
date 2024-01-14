import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementFormUserComponent } from './element-form-user.component';

describe('ElementFormUserComponent', () => {
  let component: ElementFormUserComponent;
  let fixture: ComponentFixture<ElementFormUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementFormUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementFormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
