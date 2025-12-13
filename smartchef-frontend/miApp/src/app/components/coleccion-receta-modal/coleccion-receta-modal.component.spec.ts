import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColeccionRecetaModalComponent } from './coleccion-receta-modal.component';

describe('ColeccionRecetaModalComponent', () => {
  let component: ColeccionRecetaModalComponent;
  let fixture: ComponentFixture<ColeccionRecetaModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ColeccionRecetaModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColeccionRecetaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
