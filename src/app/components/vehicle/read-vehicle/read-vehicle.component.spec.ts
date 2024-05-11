import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadVehicleComponent } from './read-vehicle.component';

describe('ReadVehicleComponent', () => {
  let component: ReadVehicleComponent;
  let fixture: ComponentFixture<ReadVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadVehicleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
