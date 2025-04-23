import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatuadoresDetalleComponent } from './tatuadores-detalle.component';

describe('TatuadoresDetalleComponent', () => {
  let component: TatuadoresDetalleComponent;
  let fixture: ComponentFixture<TatuadoresDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TatuadoresDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TatuadoresDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
