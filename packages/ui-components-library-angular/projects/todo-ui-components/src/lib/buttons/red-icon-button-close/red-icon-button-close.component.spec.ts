import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedIconButtonCloseComponent } from './red-icon-button-close.component';

describe('RedIconButtonCloseComponent', () => {
  let component: RedIconButtonCloseComponent;
  let fixture: ComponentFixture<RedIconButtonCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedIconButtonCloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedIconButtonCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
