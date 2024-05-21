import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadQrComponent } from './read-qr.component';

describe('ReadVehicleComponent', () => {
  let component: ReadQrComponent;
  let fixture: ComponentFixture<ReadQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
