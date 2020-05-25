import { TestBed } from '@angular/core/testing';

import { GameModelService } from './game-model.service';
import { IonicStorageModule, Storage } from '@ionic/storage';

const storageIonicMock: any = {
  get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
};

describe('GameModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: Storage,
        useValue: storageIonicMock
      }
    ]
  }));

  it('should be created', () => {
    const service: GameModelService = TestBed.get(GameModelService);
    expect(service).toBeTruthy();
  });
});
