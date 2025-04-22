import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosRegistradosComponent } from './empleados-registrados.component';

describe('EmpleadosRegistradosComponent', () => {
  let component: EmpleadosRegistradosComponent;
  let fixture: ComponentFixture<EmpleadosRegistradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosRegistradosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
