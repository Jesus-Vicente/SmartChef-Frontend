import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from '../../services/receta.service';
import { RecetaCrear } from "../../models/RecetaCrear.model";
import {
  IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonChip, IonCol,
  IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonSpinner, IonRow, IonSelect,
  IonSelectOption, IonTextarea, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { PreferenciaService } from "../../services/preferencia.service";
import { Preferencia } from "../../models/Preferencia.model";
import { IngredienteService } from "../../services/ingrediente.service";
import { IngredienteReceta } from "../../models/IngredienteReceta.model";
import { CommonModule } from "@angular/common";
import { Ingrediente } from "../../models/Ingrediente.model";

@Component({
  selector: 'app-editar-receta',
  templateUrl: './editar-receta.page.html',
  styleUrls: ['./editar-receta.page.scss'],
  imports: [
    CommonModule, IonBackButton, IonTitle, IonButtons, IonToolbar, IonHeader, IonContent, IonItem, IonLabel,
    IonInput, IonTextarea, IonButton, FormsModule, IonChip, IonSelectOption, IonSelect, IonCol, IonRow, IonCard,
    IonCardTitle, IonCardHeader, IonIcon, IonCardContent, IonList, IonGrid, IonCardSubtitle, IonSpinner
  ]
})
export class EditarRecetaPage implements OnInit {

  idReceta: number | null = null;

  recetaForm: RecetaCrear = {} as RecetaCrear;
  isLoading = true;

  private recetaService = inject(RecetaService);
  private preferenciaService = inject(PreferenciaService);
  private ingredienteService = inject(IngredienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);

  preferenciasDisponibles: Preferencia[] = [];
  preferenciasActivas: number[] = [];

  ingredientesDisponibles: Ingrediente[] = [];

  // Cambié nuevoNombreIngrediente:string por nuevoIngredienteId:number para el select funcional
  nuevoIngredienteId: number | null = null;
  nuevoCantidadIngrediente: number = 0;
  nuevoUnidadIngrediente: string = '';

  constructor() { }

  ngOnInit() {
    const idParams = this.route.snapshot.paramMap.get('id');
    this.idReceta = idParams ? +idParams : null;

    if (this.idReceta) {
      this.cargarDatosReceta(this.idReceta);
      this.cargarPreferenciasDisponibles();
      this.cargarIngredientesDisponibles();
    } else {
      console.error('ID de receta no proporcionado para la edición.');
      this.router.navigateByUrl('/home');
    }
  }

  cargarDatosReceta(id: number) {
    this.recetaService.obtenerRecetasConIngredientes(id).subscribe(
      (data: RecetaCrear) => {
        this.recetaForm = data;
        this.isLoading = false;

        if (data.idPreferencias) {
          this.preferenciasActivas = [...data.idPreferencias];
        }

        console.log('Datos cargados:', this.recetaForm);
      },
      (error) => {
        console.error('Error al cargar la receta:', error);
        this.isLoading = false;
      }
    );
  }

  cargarIngredientesDisponibles() {
    this.ingredienteService.obtenerIngredientes().subscribe({
      next: (data: Ingrediente[]) => {
        this.ingredientesDisponibles = data;
        this.cd.detectChanges();
        console.log('Ingredientes cargados:', this.ingredientesDisponibles);
      },
      error: (e) => console.error(e)
    });
  }

  agregarIngrediente() {
    // Buscar el nombre del ingrediente seleccionado por ID para agregarlo junto con cantidad y unidad
    if (this.nuevoIngredienteId && this.nuevoCantidadIngrediente > 0 && this.nuevoUnidadIngrediente) {
      const ingredienteSeleccionado = this.ingredientesDisponibles.find(ing => ing.id === this.nuevoIngredienteId);

      if (!ingredienteSeleccionado) {
        alert('Ingrediente no válido.');
        return;
      }

      const nuevoIngrediente: IngredienteReceta = {
        nombre: ingredienteSeleccionado.nombre,
        cantidad: this.nuevoCantidadIngrediente,
        unidad: this.nuevoUnidadIngrediente
      };

      if (!this.recetaForm.ingredientesConDetalle) {
        this.recetaForm.ingredientesConDetalle = [];
      }

      this.recetaForm.ingredientesConDetalle.push(nuevoIngrediente);

      // Reset campos
      this.nuevoIngredienteId = null;
      this.nuevoCantidadIngrediente = 0;
      this.nuevoUnidadIngrediente = '';
    } else {
      alert('Debes completar todos los campos para agregar un ingrediente.');
    }
  }

  eliminarIngrediente(index: number) {
    if (this.recetaForm.ingredientesConDetalle && index >= 0 && index < this.recetaForm.ingredientesConDetalle.length) {
      this.recetaForm.ingredientesConDetalle.splice(index, 1);
    }
  }

  cargarPreferenciasDisponibles() {
    this.preferenciaService.obtenerPreferencia().subscribe({
      next: (data) => {
        this.preferenciasDisponibles = data;
        console.log('Preferencias cargadas (IDs):', data.map(p => ({ id: p.id, nombre: p.nombrePreferencia })));
      },
      error: (error) => console.error('Error al cargar preferencias:', error)
    });
  }

  togglePreferencia(idPreferencia: number) {
    const index = this.preferenciasActivas.indexOf(idPreferencia);
    if (index > -1) {
      this.preferenciasActivas.splice(index, 1);
    } else {
      this.preferenciasActivas.push(idPreferencia);
    }
    this.recetaForm.idPreferencias = this.preferenciasActivas;
  }

  isPreferenciaActiva(idPreferencia: number): boolean {
    return this.preferenciasActivas.includes(idPreferencia);
  }

  guardarReceta() {
    this.recetaForm.idPreferencias = this.preferenciasActivas;

    this.recetaService.modificarReceta(this.idReceta, this.recetaForm).subscribe({
      next: () => {
        alert('Receta modificada con éxito!');
        this.router.navigateByUrl('/main');
      },
      error: (error) => {
        console.error('Error al modificar la receta:', error);
        alert('Hubo un error al guardar la receta.');
      }
    });
  }
}
