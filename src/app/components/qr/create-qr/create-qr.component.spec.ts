import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQrComponent } from './create-qr.component';

describe('CreateVehicleComponent', () => {
  let component: CreateQrComponent;
  let fixture: ComponentFixture<CreateQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
