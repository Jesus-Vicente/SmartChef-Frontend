import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonChip, IonContent, IonHeader, IonIcon, IonItem,
  IonLabel, IonList, IonTitle, IonToolbar, IonButton
} from '@ionic/angular/standalone';
import {RegistroHistorial} from "../../models/RegistroHistorial.model";
import {addIcons} from "ionicons";
import {calendarOutline} from "ionicons/icons";
import {ReplacePipe} from "../../pipes/replace-pipe";

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    // Componentes de Ionic:
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
    IonChip, IonLabel, IonCardHeader, IonCardTitle, IonCardContent,
    IonCard, IonIcon, IonButton,

    ReplacePipe, ReplacePipe, // 🔑 Declaración del pipe
  ],
  providers: [DatePipe]
})
export class HistorialPage implements OnInit {

  protected historialRecetas: RegistroHistorial[] = [];

  constructor() {
    addIcons({calendarOutline});
  }

  ngOnInit() {
    this.cargarDatosEjemplo();
  }

  cargarDatosEjemplo(): void {
    this.historialRecetas = [
      {
        id: 1,
        nombreReceta: 'Tortilla de Patatas',
        fecha_realizacion: '2025-12-10T19:30:00',
        duracion: 45,
        estado: 'completada',
        calificacion: 4.5,
        comentario: 'Quedó jugosa y perfecta!'
      },
      {
        id: 2,
        nombreReceta: 'Sopa de Verduras',
        fecha_realizacion: '2025-12-11T14:00:00',
        duracion: 30,
        estado: 'completada',
        calificacion: 5.0
      },
      {
        id: 3,
        nombreReceta: 'Pasta Carbonara',
        fecha_realizacion: '2025-12-12T19:00:00',
        duracion: 0,
        estado: 'en_proceso'
      },
    ];
  }
}
