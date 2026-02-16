import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsAdmin } from './flights-admin';

describe('FlightsAdmin', () => {
  let component: FlightsAdmin;
  let fixture: ComponentFixture<FlightsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
