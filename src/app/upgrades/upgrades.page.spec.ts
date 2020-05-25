import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpgradesPage } from './upgrades.page';
import { UpgradeComponent } from '../components/upgrade/upgrade.component';

describe('UpgradesPage', () => {
  let component: UpgradesPage;
  let fixture: ComponentFixture<UpgradesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UpgradesPage,
        UpgradeComponent
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
