import {Component, inject, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import { CommonModule } from '@angular/common';
import {
  IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon,
  IonItem, IonItemDivider, IonLabel, IonList,
  IonListHeader, IonNote, IonSelect, IonSelectOption, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {Preferencia} from "../../models/Preferencia.model";

interface PreferenciaFiltro { nombre: string; seleccionada: boolean; }
interface IngredienteSeleccionado { nombre: string; }

@Component({
  selector: 'app-filtro-modal',
  templateUrl: './filtro-modal.component.html',
  styleUrls: ['./filtro-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule, IonButton, IonContent, IonList, IonListHeader, IonLabel,
    IonItem, IonCheckbox, FormsModule, IonButtons, IonTitle, IonToolbar,
    IonHeader, IonItemDivider, IonNote, IonIcon, IonSelect, IonSelectOption
  ]
})
export class FiltroModalComponent  implements OnInit {

  @Input() preferenciasDisponibles: string[] = [];
  @Input() ingredientesDisponibles: string[] = [];

  protected preferencias: PreferenciaFiltro[] = [];
  protected ingredientesActivos: IngredienteSeleccionado[] = [];

  protected ingredienteASeleccionar: string = '';

  private modalCtrl = inject(ModalController);

  constructor() { }

  ngOnInit() {
    this.preferencias = this.preferenciasDisponibles.map(nombre => ({nombre, seleccionada: false}));
  }

  anadirIngrediente() {
    // 1. Verifica que se haya seleccionado algo.
    // 2. Verifica que no esté ya en la lista de activos.
    if (this.ingredienteASeleccionar &&
      !this.ingredientesActivos.some(i => i.nombre === this.ingredienteASeleccionar)) {

      this.ingredientesActivos.push({ nombre: this.ingredienteASeleccionar });
      this.ingredienteASeleccionar = '';
    }
  }

  eliminarIngrediente(nombre: string) {
    this.ingredientesActivos = this.ingredientesActivos.filter(i => i.nombre !== nombre);
  }

  aplicarFiltros() {
    const filtrosSeleccionados = this.preferencias
      .filter(p => p.seleccionada)
      .map(p => p.nombre);

    // Mapea solo los nombres de los ingredientes activos
    const ingredientesSeleccionados = this.ingredientesActivos
      .map(i => i.nombre);

    this.modalCtrl.dismiss({
      preferencias: filtrosSeleccionados,
      ingredientes: ingredientesSeleccionados
    }, 'apply');
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
