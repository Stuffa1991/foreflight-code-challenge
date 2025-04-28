import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TafComponent } from './taf.component';

describe('TafComponent', () => {
  let component: TafComponent;
  let fixture: ComponentFixture<TafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TafComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
