import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsAdmin } from './vendors-admin';

describe('VendorsAdmin', () => {
  let component: VendorsAdmin;
  let fixture: ComponentFixture<VendorsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorsAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
