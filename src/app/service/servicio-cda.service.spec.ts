import { TestBed } from '@angular/core/testing';

import { ServicioCdaService } from './servicio-cda.service';

describe('ServicioCdaService', () => {
  let service: ServicioCdaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioCdaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
