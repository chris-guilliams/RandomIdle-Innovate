import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpgradesPage } from './upgrades.page';
import { UpgradeComponent } from '../components/upgrade/upgrade.component';
import { Storage } from '@ionic/storage';

const storageIonicMock: any = {
  get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
};

describe('UpgradesPage', () => {
  let component: UpgradesPage;
  let fixture: ComponentFixture<UpgradesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UpgradesPage,
        UpgradeComponent
      ],
      providers: [
        {
          provide: Storage,
          useValue: storageIonicMock
        }
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpgradesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
