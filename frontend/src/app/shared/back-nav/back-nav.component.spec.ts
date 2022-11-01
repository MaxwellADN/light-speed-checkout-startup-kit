import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackNavComponent } from './back-nav.component';

describe('BackNavComponent', () => {
  let component: BackNavComponent;
  let fixture: ComponentFixture<BackNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
