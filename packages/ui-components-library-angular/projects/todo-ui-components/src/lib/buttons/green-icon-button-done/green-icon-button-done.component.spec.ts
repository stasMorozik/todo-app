import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenIconButtonDoneComponent } from './green-icon-button-done.component';

describe('GreenIconButtonDoneComponent', () => {
  let component: GreenIconButtonDoneComponent;
  let fixture: ComponentFixture<GreenIconButtonDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenIconButtonDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenIconButtonDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
