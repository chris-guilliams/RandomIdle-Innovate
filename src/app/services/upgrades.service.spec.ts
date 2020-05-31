import { TestBed } from '@angular/core/testing';

import { UpgradesService } from './upgrades.service';

describe('UpgradesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpgradesService = TestBed.get(UpgradesService);
    expect(service).toBeTruthy();
  });
});
