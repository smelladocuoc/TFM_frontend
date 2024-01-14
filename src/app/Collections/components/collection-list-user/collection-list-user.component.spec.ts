import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionListUserComponent } from './collection-list-user.component';

describe('CollectionListUserComponent', () => {
  let component: CollectionListUserComponent;
  let fixture: ComponentFixture<CollectionListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionListUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
