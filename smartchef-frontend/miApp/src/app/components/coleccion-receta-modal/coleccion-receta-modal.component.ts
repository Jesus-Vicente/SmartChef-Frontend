// src/app/components/coleccion-receta-modal/coleccion-receta-modal.component.ts

import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ModalController,
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel, IonNote, IonCard, IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, timeOutline, chevronForwardOutline } from 'ionicons/icons';

// Define la interfaz
interface RecetaColeccion {
  id: number;
  nombre: string;
  tiempo_preparacion: number;
}

@Component({
  selector: 'app-coleccion-receta-modal',
  templateUrl: './coleccion-receta-modal.component.html',
  styleUrls: ['./coleccion-receta-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons,
    IonButton, IonIcon, IonList, IonItem, IonLabel, IonNote, IonCard, IonCardContent
  ]
})
export class ColeccionRecetaModalComponent {

  @Input() coleccionId!: number;
  @Input() coleccionNombre!: string;
  @Input() recetas: RecetaColeccion[] = [];

  private modalCtrl = inject(ModalController);

  constructor() {
    addIcons({ close, timeOutline, chevronForwardOutline });
  }

  // Cierra el modal, envía rol 'cancel'
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  verDetalleReceta(id: number): void {
    console.log(`Navegando a detalle de la receta ${id} dentro del modal.`);
    // Aquí puedes añadir la navegación real o cerrar el modal
  }
}
