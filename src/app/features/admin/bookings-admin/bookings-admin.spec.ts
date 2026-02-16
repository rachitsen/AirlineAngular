import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsAdmin } from './bookings-admin';

describe('BookingsAdmin', () => {
  let component: BookingsAdmin;
  let fixture: ComponentFixture<BookingsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
