import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictatorsComponent } from './dictators.component';

describe('DictatorsComponent', () => {
  let component: DictatorsComponent;
  let fixture: ComponentFixture<DictatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
