import { TestBed } from '@angular/core/testing';

import { GameModelService } from './game-model.service';

describe('GameModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameModelService = TestBed.get(GameModelService);
    expect(service).toBeTruthy();
  });
});
