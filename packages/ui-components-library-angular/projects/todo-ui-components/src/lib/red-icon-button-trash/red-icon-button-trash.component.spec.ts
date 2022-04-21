import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedIconButtonTrashComponent } from './red-icon-button-trash.component';

describe('RedIconButtonTrashComponent', () => {
  let component: RedIconButtonTrashComponent;
  let fixture: ComponentFixture<RedIconButtonTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedIconButtonTrashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedIconButtonTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
