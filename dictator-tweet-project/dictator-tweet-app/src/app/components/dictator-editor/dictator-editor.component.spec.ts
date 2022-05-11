import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictatorEditorComponent } from './dictator-editor.component';

describe('DictatorEditorComponent', () => {
  let component: DictatorEditorComponent;
  let fixture: ComponentFixture<DictatorEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictatorEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictatorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
