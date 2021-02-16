import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResumenpedidoPage } from './resumenpedido.page';

describe('ResumenpedidoPage', () => {
  let component: ResumenpedidoPage;
  let fixture: ComponentFixture<ResumenpedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenpedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenpedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
