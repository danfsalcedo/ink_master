import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatuadoresdetComponent } from './tatuadoresdet.component';

describe('TatuadoresdetComponent', () => {
  let component: TatuadoresdetComponent;
  let fixture: ComponentFixture<TatuadoresdetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TatuadoresdetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TatuadoresdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
