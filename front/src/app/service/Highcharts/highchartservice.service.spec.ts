import { TestBed } from '@angular/core/testing';

import { HighchartserviceService } from './highchartservice.service';

describe('HighchartserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HighchartserviceService = TestBed.get(HighchartserviceService);
    expect(service).toBeTruthy();
  });
});
