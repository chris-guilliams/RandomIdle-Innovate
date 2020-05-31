import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { UpgradeComponent } from './upgrade.component';
import { Upgrades } from '../../enums/upgrades';

const storageIonicMock: any = {
  get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
};

describe('UpgradeComponent', () => {
  let component: UpgradeComponent;
  let fixture: ComponentFixture<UpgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeComponent ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [
        {
          provide: Storage,
          useValue: storageIonicMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpgradeComponent);
    component = fixture.componentInstance;
    component.upgradeType = Upgrades.maxWager;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
