import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonIcon, IonLabel,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList,
  IonItem, IonNote, IonImg, IonChip, IonButton
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { timeOutline, star, heartOutline, shareOutline, printOutline, bookmarkOutline, arrowBackOutline, restaurantOutline, leafOutline, globeOutline, removeCircleOutline, personCircleOutline, calendarOutline, archiveOutline, cartOutline, cutOutline, globeOutline as difficultyIcon } from 'ionicons/icons';

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

  public recetaId!: number;
  public receta: any;

  constructor() {
    addIcons({ timeOutline, star, heartOutline, shareOutline, printOutline, bookmarkOutline, arrowBackOutline, restaurantOutline, leafOutline, globeOutline, removeCircleOutline, personCircleOutline, calendarOutline, archiveOutline, cartOutline, cutOutline, difficultyIcon });
  }

  ngOnInit() {
    this.recetaId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.cargarDatosReceta(this.recetaId);
  }

  // SIMULACIÓN de carga de datos
  private cargarDatosReceta(id: number) {
    // Ejemplo de datos de receta
    if (id === 1) {
      this.receta = {
        nombre: 'Tortilla de patatas',
        descripcion_general: 'La clásica e inigualable tortilla española. Perfecta para cualquier ocasión, ya sea como plato principal o como tapa. Este plato sencillo pero delicioso es un pilar de la gastronomía ibérica.',
        tiempo_preparacion: 30,
        porciones: 4,
        dificultad: 'Fácil',
        valoracion_promedio: 4.5,
        id_foto: '/assets/imagenes/fotos-recetas/pasta-carbonara-prueba.jpg',
        vegetariano: true,
        sin_gluten: false,
        comida_rapida: true,
        economico: false,
        ingredientes: [
          { nombre: 'Patatas Agrias', cantidad: '1 kg' },
          { nombre: 'Huevos de corral', cantidad: '6 unidades' },
          { nombre: 'Cebolla blanca', cantidad: '1 unidad' },
          { nombre: 'Aceite de oliva virgen extra', cantidad: '200 ml' },
          { nombre: 'Sal marina', cantidad: '1 cucharadita' },
        ],
        preparacion: [
          'Pelar las patatas y cortarlas en láminas muy finas o dados pequeños. Pelar y picar la cebolla finamente.',
          'En una sartén grande con el aceite, freír las patatas y la cebolla a fuego medio-bajo. Deben cocinarse hasta que estén blandas, no doradas (unos 15-20 minutos).',
          'Retirar las patatas y cebolla y escurrir el exceso de aceite con un colador. Añadir sal al gusto.',
          'Batir los huevos en un bol grande y mezclar bien con la mezcla de patatas y cebolla. Dejar reposar 5 minutos para que el huevo absorba el sabor.',
          'En la misma sartén, con muy poco aceite, verter la mezcla. Dejar cuajar por un lado a fuego medio-alto. Con ayuda de un plato, darle la vuelta y cuajar el otro lado hasta el punto deseado (jugosa o bien hecha).',
          'Servir caliente o a temperatura ambiente.'
        ],
        consejos: 'Para una tortilla más cremosa, asegúrate de que el huevo no se cocine demasiado en el primer cuajado. También puedes añadir un poco de leche a la mezcla de huevo para una textura más esponjosa.'
      };
    } else {
      // Datos para la paella o cualquier otra receta
      this.receta = {
        nombre: 'Paella Valenciana',
        descripcion_general: 'Paella valenciana tradicional con mariscos y pollo.',
        tiempo_preparacion: 60,
        porciones: 6,
        dificultad: 'Medio',
        valoracion_promedio: 4.8,
        id_foto: '/assets/imagenes/fotos-recetas/paella-prueba.jpg',
        vegetariano: false,
        sin_gluten: true,
        comida_rapida: false,
        economico: false,
        ingredientes: [],
        preparacion: [],
        consejos: 'Usa azafrán de buena calidad para el sabor auténtico.'
      };
    }
  }
};
