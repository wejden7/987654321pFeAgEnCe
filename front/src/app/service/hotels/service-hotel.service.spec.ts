import { TestBed } from '@angular/core/testing';

import { ServiceHotelService } from './service-hotel.service';

describe('ServiceHotelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceHotelService = TestBed.get(ServiceHotelService);
    expect(service).toBeTruthy();
  });
});
