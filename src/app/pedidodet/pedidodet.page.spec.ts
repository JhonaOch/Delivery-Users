import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidodetPage } from './pedidodet.page';

describe('PedidodetPage', () => {
  let component: PedidodetPage;
  let fixture: ComponentFixture<PedidodetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidodetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidodetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
