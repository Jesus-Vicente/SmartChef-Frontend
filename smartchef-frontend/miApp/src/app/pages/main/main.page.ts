import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, ActionSheetController, ModalController, AlertController} from "@ionic/angular";
import {Router} from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component'
import { addIcons } from 'ionicons';

import { ellipsisVertical, createOutline, trashOutline, close, timeOutline, star, heartOutline, shareOutline, printOutline, bookmarkOutline, arrowBackOutline, restaurantOutline, leafOutline, globeOutline, removeCircleOutline, personCircleOutline, calendarOutline, archiveOutline, cartOutline } from 'ionicons/icons';
import {RecetaService} from "../../services/receta.service";
import {Receta} from "../../models/Receta.model";
import {FiltroModalComponent} from "../../components/filtro-modal/filtro-modal.component";
import {PreferenciaService} from "../../services/preferencia.service";
import {IngredienteService} from "../../services/ingrediente.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, SearchBarComponent],
})

export class MainPage implements OnInit{

  private router: Router = inject(Router);

  private recetaService = inject(RecetaService);
  protected recetas: Receta[] = []

  private ingredienteService = inject(IngredienteService);
  protected ingredientesDisponibles: string[] = [];
  protected ingredientesActivos: string[] = [];

  private preferenciaService = inject(PreferenciaService);
  protected preferenciasDisponibles: string[] = [];

  protected preferenciasActivas: string[] = [];

  private modalCtrl = inject(ModalController);

  private menuEditarEliminar = inject(ActionSheetController);

  private alertaEliminarReceta = inject(AlertController);



  constructor() {
    addIcons({ ellipsisVertical, createOutline, trashOutline, close, timeOutline, star, heartOutline, shareOutline, printOutline, bookmarkOutline, arrowBackOutline, restaurantOutline, leafOutline, globeOutline, removeCircleOutline, personCircleOutline, calendarOutline, archiveOutline, cartOutline });
  }

  ngOnInit(): void {
    this.cargarRecetas();
    this.cargarPreferencias();
    this.cargarIngredientes();
  }


  searchText: string = '';


  onSearchChanged(text: string) {
    this.searchText = text;
    console.log('Texto buscado:', text);
  }

  cargarRecetas() {
    this.recetaService.obtenerReceta().subscribe({
      next: (datos) => {
        console.log('Datos: ', datos);
        this.recetas = datos;
      },
      error: (error) => console.error('Error al cargar recetas: ', error),
      complete: () => console.log('Petición completada')
    })
  }

  async abrirFiltroModal() {
    const modal = await this.modalCtrl.create({
      component: FiltroModalComponent,
      componentProps: {

        preferenciasDisponibles: this.preferenciasDisponibles,
        ingredientesDisponibles: this.ingredientesDisponibles
      }
    });

    modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'apply' && data) {
      this.preferenciasActivas = data.preferencias || [];
      this.ingredientesActivos = data.ingredientes || [];

      console.log('Preferencias activas:', this.preferenciasActivas);
      console.log('Ingredientes activos:', this.ingredientesActivos);

      this.cargarRecetasConFiltros();
    }
  }

  cargarRecetasConFiltros() {
    const tieneFiltros = this.preferenciasActivas.length > 0 || this.ingredientesActivos.length > 0;

    if (!tieneFiltros){
      this.cargarRecetas();
      return;
    }

    this.recetaService.obtenerRecetasFiltradas(
      this.preferenciasActivas,
      this.ingredientesActivos)
      .subscribe({
        next: (datos) => {
          this.recetas = datos;
        },
        error: (error) => console.error('Error al cargar recetas filtradas: ', error),
      })
  }

  cargarPreferencias() {
    this.preferenciaService.obtenerPreferencia().subscribe(data => {
      this.preferenciasDisponibles = data.map(p => p.nombrePreferencia);
      console.log('Preferencias disponibles cargadas: ', this.preferenciasDisponibles);
    })
  }

  cargarIngredientes() {
    this.ingredienteService.obtenerIngredientes().subscribe(data => {
      this.ingredientesDisponibles = data.map(i => i.nombre);
      console.log('Ingredientes disponibles cargados: ', this.ingredientesDisponibles);
    })
  }


  async openActionMenu(event: Event, recetaId: number) {
    event.stopPropagation();

    const actionSheet = await this.menuEditarEliminar.create({
      header: 'Opciones de Receta',
      buttons: [
        {
          text: 'Editar Receta',
          icon: 'create-outline',
          handler: () => {
            this.router.navigate(['/editar-receta', recetaId]);
            console.log('Navegar a página de edición de receta ID:', recetaId);
          },
        },
        {
          text: 'Eliminar Receta',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.confirmarEliminarReceta(recetaId);
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


  async confirmarEliminarReceta(idReceta: number) {
    const receta = this.recetas.find(r => r.id === idReceta);
    const nombreReceta = receta? receta.nombre : "Esta receta";

    const alerta = await this.alertaEliminarReceta.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar la receta " ${nombreReceta} "?`,
      buttons: [
        {
          text: 'NO, CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Eliminar Receta Cancelada.');
          },
        },
        {
          text: 'SÍ, ELIMINAR',
          cssClass: 'alerta-button-delete',
          handler: () => {
            this.eliminarReceta(idReceta);
          }
        }
      ]
    });

    await alerta.present();

  }

  eliminarReceta(idReceta: number) {
    this.recetaService.eliminarReceta(idReceta).subscribe({
      next: () => {
        console.log('Receta eliminada con ID:', idReceta);
        this.cargarRecetas();
      },
      error: (error) => console.error('Error al eliminar receta con ID:', idReceta, error)
    })
  }


  irADetalleReceta(id: number) {
    this.router.navigate(['detalle-receta', id]);
    console.log('Ir a detalle receta con ID:', id);
  }


  verificarPreferencias(receta: Receta, nombrePreferencia: string): boolean {
    if (!receta.preferencias || receta.preferencias.length === 0) return false;

    const preferenciasMinusculas = receta.preferencias.map(p => p.toLowerCase());
    return preferenciasMinusculas.includes(nombrePreferencia.toLowerCase());
  }


  irA(ruta: string) {
    this.router.navigate(['/' + ruta]);
    console.log('Navegando a ruta:', '/' + ruta);
  }
}
