import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsAdmin } from './airports-admin';

describe('AirportsAdmin', () => {
  let component: AirportsAdmin;
  let fixture: ComponentFixture<AirportsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportsAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
