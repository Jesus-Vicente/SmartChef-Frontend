import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonIcon, IonLabel, IonChip,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList,
  IonItem, IonNote, IonImg, IonButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  timeOutline, star, heartOutline, shareOutline, printOutline,
  bookmarkOutline, arrowBackOutline, restaurantOutline, leafOutline,
  globeOutline, removeCircleOutline, personCircleOutline, calendarOutline,
  archiveOutline, cartOutline, cutOutline, globeOutline as difficultyIcon
} from 'ionicons/icons';
import {RecetaService} from "../../services/receta.service";
import {RecetaDetalles} from "../../models/RecetaDetalles.model";

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.page.html',
  styleUrls: ['./detalle-receta.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonIcon, IonLabel, IonChip,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList,
    IonItem, IonNote, IonImg, IonButton,
  ]
})
export class DetalleRecetaPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private recetaService = inject(RecetaService);

  public recetaId!: number;
  public receta!: RecetaDetalles;

  public cargando = false;
  public errorCargando = false;

  constructor() {
    addIcons({
      timeOutline, star, heartOutline, shareOutline, printOutline,
      bookmarkOutline, arrowBackOutline, restaurantOutline, leafOutline,
      globeOutline, removeCircleOutline, personCircleOutline, calendarOutline,
      archiveOutline, cartOutline, cutOutline, difficultyIcon
    });
  }

  ngOnInit() {
    this.recetaId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.cargarDatosReceta(this.recetaId);
  }

  cargarDatosReceta(id: number) {
    this.cargando = true;
    this.errorCargando = false;

    this.recetaService.detalleReceta(id).subscribe({
      next: (data) => {
        this.receta = data;
        this.cargando = false;
      },
      error: () => {
        this.errorCargando = true;
        this.cargando = false;
      }
    });
  }
}
