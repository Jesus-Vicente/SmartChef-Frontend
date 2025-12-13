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
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {addOutline, closeCircleOutline, imageOutline, nuclear, radioOutline, removeCircleOutline} from "ionicons/icons";
import {RecetaService} from "../../services/receta.service";
import {Receta} from "../../models/Receta.model";
import {RecetaCrear} from "../../models/RecetaCrear.model";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";

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

  private recetaService = inject(RecetaService);
  protected recetas: Receta[] = [];

  private router = inject(Router);
  private alertController = inject(AlertController);

  segmentoSeleccionado: 'basica' | 'ingredientes' | 'detalles' = 'basica';

  protected formularioReceta: RecetaCrear = {
    nombre: '',
    descripcion: '',
    instrucciones: [],
    tiempo_preparacion: 1,
    dificultad: 'BAJA',
    porciones: 1,
    nombresIngredientes: [],
    costo_estimado: 0,
    foto: '',
    id_foto: null
  };

  async abrirInputFoto() {
    const alert = await this.alertController.create({ // Ya no dará error
      header: 'Enlazar Foto (DEMO)',
      subHeader: 'Ingresa la URL de la imagen',
      inputs: [
        {
          name: 'url',
          type: 'url',
          placeholder: 'URL de la foto',
          value: this.formularioReceta.foto || ''
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Aplicar',
          handler: (data: { url: string; }) => {
            this.formularioReceta.foto = data.url.trim() || '';
            console.log("SIMULACIÓN: URL de foto guardada.");
          },
        },
      ],
    });
    await alert.present();
  }

  eliminarFoto() {
    this.formularioReceta.foto = '';
    console.log("SIMULACIÓN: Foto eliminada.");
  }

  constructor() {
    addIcons({closeCircleOutline, radioOutline, removeCircleOutline, addOutline, imageOutline})
  }

  ngOnInit() {
    this.cargarRecetas();
  }

  cargarRecetas(): void {

  }


  ingredienteBuscado: string = '';







  agregarIngrediente(nombre: string) {
    if (!nombre || nombre.trim() === '') return;

    const nombreLimpio = nombre.trim();

    const existe = this.formularioReceta.nombresIngredientes.some(n => n.toLowerCase() === nombreLimpio.toLowerCase());

    if (!existe) {
      this.formularioReceta.nombresIngredientes.push(nombreLimpio);
    }

    this.ingredienteBuscado = ''; // limpiar búsqueda después de añadir
  }

  eliminarIngrediente(index: number) {
    this.formularioReceta.nombresIngredientes.splice(index, 1);
  }

  agregarInstruccion() {
    this.formularioReceta.instrucciones.push('');
  }

  eliminarInstruccion(index: number) {
    if (this.formularioReceta.instrucciones.length > 1) {
      this.formularioReceta.instrucciones.splice(index, 1);
    }
  }

  ajustarValorNumerico(controlName: 'tiempo_preparacion' | 'porciones' | 'costo_estimado', delta: number) {
    let currentValue = this.formularioReceta[controlName] === null ? 0 : Number(this.formularioReceta[controlName]);
    let newValue = currentValue + delta;

    if (newValue < 0 && controlName === 'costo_estimado') {
      newValue = 0;
    } else if (newValue < 1) { // Para tiempo y porciones
      newValue = 1;
    }

    this.formularioReceta[controlName] = newValue;
  }

  puedeDecrementar(controlName: 'tiempo_preparacion' | 'porciones'): boolean {
    return (this.formularioReceta[controlName] || 0) > 1;
  }

  guardarReceta(){
    // La validación f.invalid en el HTML maneja esto, pero mantenemos el console.log
    if (!this.formularioReceta.nombre || !this.formularioReceta.descripcion ||
      this.formularioReceta.tiempo_preparacion <= 0 || !this.formularioReceta.dificultad) {
      console.log("DEMO: Formulario incompleto. Rellena todos los campos obligatorios.");
      // No devolvemos 'return' si queremos forzar la navegación para probar la ruta
      // Si el botón está [disabled]="f.invalid", esta línea solo se ejecuta si f.invalid es falso
    }

    // Esta línea se ejecuta al hacer click, lo que cumple el requisito de navegación.
    console.log("Receta lista para enviar", this.formularioReceta);
    this.router.navigate(['/main']);
  }

}
