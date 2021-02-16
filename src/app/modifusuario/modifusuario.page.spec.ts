import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifusuarioPage } from './modifusuario.page';

describe('ModifusuarioPage', () => {
  let component: ModifusuarioPage;
  let fixture: ComponentFixture<ModifusuarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifusuarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
