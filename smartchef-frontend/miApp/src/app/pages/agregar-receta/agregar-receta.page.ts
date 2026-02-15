import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle, IonChip,
  IonContent, IonFooter,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToolbar,
  AlertController
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {
  addOutline,
  cameraOutline,
  closeCircleOutline,
  imageOutline,
  radioOutline,
  removeCircleOutline
} from "ionicons/icons";
import {RecetaService} from "../../services/receta.service";
import {Receta} from "../../models/Receta.model";
import {RecetaCrear} from "../../models/RecetaCrear.model";
import {Router} from "@angular/router";
import {IngredienteReceta} from "../../models/IngredienteReceta.model";
import {PreferenciaService} from "../../services/preferencia.service";
import {Preferencia} from "../../models/Preferencia.model";
import {FotoService} from "../../services/foto.service";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.page.html',
  styleUrls: ['./agregar-receta.page.scss'],
  standalone: true,
  imports: [IonContent, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton,
    IonSegment, IonSegmentButton, IonIcon, IonChip, IonSelectOption, IonSelect, IonFooter]
})
export class AgregarRecetaPage implements OnInit {

  private fotoService = inject(FotoService);

  private recetaService = inject(RecetaService);
  protected recetas: Receta[] = [];

  private router = inject(Router);
  private alertController = inject(AlertController);

  private preferenciaService = inject(PreferenciaService);
  // --- CORRECCIÓN DE TIPO: Usar el modelo Preferencia[] ---
  protected preferenciasDisponibles: Preferencia[] = [];

  segmentoSeleccionado: 'basica' | 'ingredientes' | 'detalles' = 'basica';

  constructor() {
    addIcons({closeCircleOutline, radioOutline, removeCircleOutline, addOutline, imageOutline, cameraOutline, linkOutline: 'link'});
  }

  ngOnInit() {
    this.cargarPreferenciasDisponibles();
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

  togglePreferencia(preferenciaId: number) {
    if (!this.formularioReceta.idPreferencias) {
      this.formularioReceta.idPreferencias = [];
    }

    const index = this.formularioReceta.idPreferencias.indexOf(preferenciaId);

    if (index > -1) {
      this.formularioReceta.idPreferencias.splice(index, 1);
    } else {
      this.formularioReceta.idPreferencias.push(preferenciaId);
    }
    console.log(`Toggle ID ${preferenciaId}. IDs activos:`, this.formularioReceta.idPreferencias);
  }

  esPreferenciaActiva(preferenciaId: number): boolean {
    if (!this.formularioReceta.idPreferencias) {
      return false;
    }
    return this.formularioReceta.idPreferencias.includes(preferenciaId);
  }


  protected formularioReceta: RecetaCrear = {
    nombre: '',
    descripcion: '',
    instrucciones: [''],
    tiempo_preparacion: 1,
    dificultad: 'BAJA',
    porciones: 1,
    costo_estimado: 0,
    url_foto: '',
    id_foto: null,
    idUsuarioCreador: 1,
    ingredientesConDetalle: [],
    idPreferencias: []
  };

  private actionSheetController = inject(ActionSheetController);

  async abrirInputFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar Imagen',
      buttons: [
        {
          text: 'Usar Cámara',
          icon: 'camera-outline',
          handler: () => {
            this.tomarFoto();
          }
        },
        {
          text: 'Pegar Enlace (URL)',
          icon: 'link-outline',
          handler: () => {
            this.pedirURLImagen(); // Tu método actual que abre el alert
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async tomarFoto() {
    const urlCapturada = await this.fotoService.takePhoto();
    if (urlCapturada) {
      this.formularioReceta.url_foto = urlCapturada;
      console.log("Foto capturada con éxito:", urlCapturada);
    }
  }

  async pedirURLImagen() {
    const alert = await this.alertController.create({
      header: 'Enlazar Foto',
      subHeader: 'Introduce la dirección de la imagen',
      inputs: [
        {
          name: 'urlInput', // nombre del campo
          type: 'url',
          placeholder: 'https://ejemplo.com/plato.jpg',
          value: this.formularioReceta.url_foto // por si ya había una
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            // Asignamos el valor del input al formulario
            if (data.urlInput) {
              this.formularioReceta.url_foto = data.urlInput.trim();
              console.log("URL guardada:", this.formularioReceta.url_foto);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  eliminarFoto() {
    this.formularioReceta.url_foto = '';
    console.log("SIMULACIÓN: Foto eliminada.");
  }

  ingredienteBuscado: string = '';

  agregarIngrediente(nombre: string) {
    if (!nombre || nombre.trim() === '') return;

    const nombreLimpio = nombre.trim();

    const existe = this.formularioReceta.ingredientesConDetalle.some(
      i => i.nombre.toLowerCase() === nombreLimpio.toLowerCase()
    );

    if (!existe) {
      const nuevoIngrediente: IngredienteReceta = {
        nombre: nombreLimpio,
        cantidad: 1,
        unidad: 'unidad'
      }

      this.formularioReceta.ingredientesConDetalle.push(nuevoIngrediente);
    }

    this.ingredienteBuscado = '';
  }

  eliminarIngrediente(index: number) {
    this.formularioReceta.ingredientesConDetalle.splice(index, 1);
  }

  agregarInstruccion() {
    this.formularioReceta.instrucciones.push('');
  }

  eliminarInstruccion(index: number) {
    if (this.formularioReceta.instrucciones.length > 1) {
      this.formularioReceta.instrucciones.splice(index, 1);
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  ajustarValorNumerico(controlName: 'tiempo_preparacion' | 'porciones' | 'costo_estimado', delta: number) {
    let currentValue = this.formularioReceta[controlName] === null ? 0 : Number(this.formularioReceta[controlName]);
    let newValue = currentValue + delta;

    if (newValue < 0 && controlName === 'costo_estimado') {
      newValue = 0;
    } else if (newValue < 1) {
      newValue = 1;
    }

    this.formularioReceta[controlName] = newValue;
  }

  puedeDecrementar(controlName: 'tiempo_preparacion' | 'porciones'): boolean {
    return (this.formularioReceta[controlName] || 0) > 1;
  }

  guardarReceta(){

    if (!this.formularioReceta.nombre || this.formularioReceta.tiempo_preparacion <= 0) {
      this.alertController.create({
        header: 'Campos requeridos',
        message: 'Debes completar el Nombre de la Receta y el Tiempo de Preparación.',
        buttons: ['OK']
      }).then(alert => alert.present());
      return;
    }

    const instruccionesString = this.formularioReceta.instrucciones.filter(i => i.trim() !== '').join('\n');

    const dtoParaEnvio: any = {
      nombre: this.formularioReceta.nombre,
      descripcion: this.formularioReceta.descripcion || null,
      instrucciones: instruccionesString || null,
      dificultad: this.formularioReceta.dificultad,
      tiempo_preparacion: this.formularioReceta.tiempo_preparacion,
      costo_estimado: this.formularioReceta.costo_estimado || 0.0,
      porciones: this.formularioReceta.porciones || 1,
      idUsuarioCreador: this.formularioReceta.idUsuarioCreador || 1,
      id_foto: this.formularioReceta.id_foto || null,
      url_foto: this.formularioReceta.url_foto || null,
      ingredientesConDetalle: this.formularioReceta.ingredientesConDetalle || [],
      idPreferencias: this.formularioReceta.idPreferencias || []
    };


    console.log("Enviando DTO completo y correcto:", dtoParaEnvio);

    this.recetaService.crearReceta(dtoParaEnvio).subscribe({
      next: () => {
        console.log("✅ Receta guardada con éxito.");
        this.router.navigate(['/main']);
      },
      error: (error) => {
        console.error("❌ Error al guardar la receta:", error);
        this.alertController.create({
          header: 'Error al Guardar',
          message: 'No se pudo guardar la receta. Revisa la consola y asegúrate que el backend está corriendo y sin fallos de compilación. (Código de error 500)',
          buttons: ['OK']
        }).then(alert => alert.present());
      }
    });
  }
}
