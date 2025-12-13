import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel, IonNote, IonSegment, IonSegmentButton, IonFab, IonFabButton, IonList
} from '@ionic/angular/standalone';
// Importamos solo los tipos de los servicios
import { ModalController, AlertController } from '@ionic/angular';
import {addIcons} from "ionicons";
import {star, heart, heartOutline, folderOutline, arrowForwardOutline, timeOutline, flameOutline, peopleOutline, add, chevronForwardOutline} from "ionicons/icons";

// 🔑 IMPORTACIÓN CRÍTICA: Componente Modal (CORRECTO)
import { ColeccionRecetaModalComponent } from '../../components/coleccion-receta-modal/coleccion-receta-modal.component';


// --- Definiciones de tipos MOCK (Asumiendo que estos son tus modelos) ---
interface RecetaFavorita { id: number; nombre: string; tiempo_preparacion: number; fecha_guardado: string; }
interface Coleccion { id: number; nombreColeccion: string; descripcion: string; cantidadRecetas: number; fecha_creacion: string; }
interface RecetaColeccion { id: number; nombre: string; tiempo_preparacion: number; }
// -------------------------------------------------------------------------


type Segmento = 'favoritos' | 'colecciones';

@Component({
  selector: 'app-recetas-guardadas',
  templateUrl: './recetas-guardadas.page.html',
  styleUrls: ['./recetas-guardadas.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonIcon, IonButton,
    IonSegmentButton, IonLabel, IonSegment, IonItem, IonNote, IonFab, IonFabButton, IonList
  ],
  providers: [DatePipe]
})
export class RecetasGuardadasPage implements OnInit {

  protected segmentoSeleccionado: Segmento = 'favoritos';

  protected recetasFavoritas: RecetaFavorita[] = [];
  protected misColecciones: Coleccion[] = [];


  constructor() {
    addIcons({star, heart, heartOutline, folderOutline, arrowForwardOutline, timeOutline, flameOutline, peopleOutline, add, chevronForwardOutline});
  }

  ngOnInit() {
    this.cargarDatosEjemplo();
  }

  cargarDatosEjemplo(): void {
    this.recetasFavoritas = [
      {
        id: 1,
        nombre: 'Paella Valenciana',
        tiempo_preparacion: 60,
        fecha_guardado: "2025-12-10",
      },
      {
        id: 2,
        nombre: 'Tarta de Queso',
        tiempo_preparacion: 15,
        fecha_guardado: "2025-11-20",
      },
      {
        id: 3,
        nombre: 'Hummus Casero',
        tiempo_preparacion: 10,
        fecha_guardado: "2025-10-01",
      },
    ];

    this.misColecciones = [
      { id: 101, nombreColeccion: 'Cenas Rápidas', descripcion: 'Recetas de menos de 30 minutos', cantidadRecetas: 3, fecha_creacion: "2025-01-01" },
      { id: 102, nombreColeccion: 'Postres de Verano', descripcion: 'Fríos y refrescantes', cantidadRecetas: 2, fecha_creacion: "2025-06-15" },
      { id: 103, nombreColeccion: 'Recetas Veganas', descripcion: 'Platos 100% vegetales.', cantidadRecetas: 1, fecha_creacion: "2025-09-01" },
    ];
  }

  private mockRecetasPorColeccion: { [key: number]: RecetaColeccion[] } = {
    101: [
      { id: 11, nombre: 'Omelette Rápido', tiempo_preparacion: 10 },
      { id: 12, nombre: 'Sopa de Tomate en 20 min', tiempo_preparacion: 20 },
      { id: 13, nombre: 'Pasta Aglio e Olio', tiempo_preparacion: 15 },
    ],
    102: [
      { id: 21, nombre: 'Helado de Vainilla Casero', tiempo_preparacion: 25 },
      { id: 22, nombre: 'Mousse de Limón', tiempo_preparacion: 30 },
    ],
    103: [
      { id: 31, nombre: 'Curry de Garbanzos', tiempo_preparacion: 45 },
    ],
  };

  verDetalleReceta(id: number): void {
    console.log(`Navegando al detalle de la receta favorita ID: ${id}`);
    // Añadir navegación a DetalleReceta
    // this.router.navigate(['/detalle-receta', id]);
  }

  async verColeccion(id: number, nombre: string): Promise<void> {

  }

  crearNuevaColeccion(): void {
    console.log("Navegando al formulario para crear nueva colección.");
  }
}
