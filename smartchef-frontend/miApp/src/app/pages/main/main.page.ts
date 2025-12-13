import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, ActionSheetController} from "@ionic/angular";
import {Router} from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component'
import { addIcons } from 'ionicons';

import { ellipsisVertical, createOutline, trashOutline, close, timeOutline, star, heartOutline, shareOutline, printOutline, bookmarkOutline, arrowBackOutline, restaurantOutline, leafOutline, globeOutline, removeCircleOutline, personCircleOutline, calendarOutline, archiveOutline, cartOutline } from 'ionicons/icons';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, SearchBarComponent],
})

export class MainPage {

  private router= inject(Router);
  private actionSheetCtrl = inject(ActionSheetController); // INYECCIÓN

  /* Barra busqueda */
  searchText: string = '';

  onSearchChanged(text: string) {
    this.searchText = text;
    console.log('Texto buscado:', text);
  }

  /* Lista recetas vista PRUEBA */
  recetas = [
    {
      id: 1,
      nombre: 'Tortilla de patatas',
      descripcion: 'Clásica tortilla española con cebolla y patatas.',
      tiempo_preparacion: 30,
      dificultad: 'Fácil',
      valoracion_promedio: 4.5,
      porciones: 4,
      activa: true,
      fecha_creacion: '2025-11-17T10:00:00Z',
      vegetariano: true,
      sin_gluten: false,
      comida_rapida: true,
      economico: false,
      id_foto: '/assets/imagenes/fotos-recetas/pasta-carbonara-prueba.jpg'
    },
    {
      id: 2,
      nombre: 'Paella',
      descripcion: 'Paella valenciana tradicional con mariscos y pollo.',
      tiempo_preparacion: 60,
      dificultad: 'Medio',
      valoracion_promedio: 4.8,
      porciones: 6,
      activa: true,
      fecha_creacion: '2025-11-15T12:00:00Z',
      vegetariano: true,
      sin_gluten: false,
      comida_rapida: true,
      economico: false,
      id_foto: '/assets/imagenes/fotos-recetas/pasta-carbonara-prueba.jpg'
    }
  ]

  constructor() {
    addIcons({ ellipsisVertical, createOutline, trashOutline, close, timeOutline, star, heartOutline, shareOutline, printOutline, bookmarkOutline, arrowBackOutline, restaurantOutline, leafOutline, globeOutline, removeCircleOutline, personCircleOutline, calendarOutline, archiveOutline, cartOutline });
  }

  // FUNCIÓN PARA ABRIR EL MENÚ CONTEXTUAL (Action Sheet)
  async openActionMenu(event: Event, recetaId: number) {
    event.stopPropagation();

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones de Receta',
      buttons: [
        {
          text: 'Editar Receta',
          icon: 'create-outline',
          handler: () => {
            console.log('Navegar a página de edición de receta ID:', recetaId);
            // TODO: Implementar navegación a la página de edición: this.router.navigate(['/editar-receta', recetaId]);
          },
        },
        {
          text: 'Eliminar Receta',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            console.log('Solicitud de eliminación de receta ID:', recetaId);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }


  irADetalleReceta(id: number) {
    this.router.navigate(['detalle-receta', id]);
    console.log('Ir a detalle receta con ID:', id);
  }

  irA(ruta: string) {
    this.router.navigate(['/' + ruta]);
    console.log('Navegando a ruta:', '/' + ruta);
  }
}
