import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetasGuardadasPage } from './recetas-guardadas.page';

describe('RecetasGuardadasPage', () => {
  let component: RecetasGuardadasPage;
  let fixture: ComponentFixture<RecetasGuardadasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetasGuardadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
