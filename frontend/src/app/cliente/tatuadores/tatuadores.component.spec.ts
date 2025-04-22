import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatuadoresComponent } from './tatuadores.component';

describe('TatuadoresComponent', () => {
  let component: TatuadoresComponent;
  let fixture: ComponentFixture<TatuadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TatuadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TatuadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
