import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonTitle,
  IonToolbar, IonList, IonInput, IonCheckbox
} from '@ionic/angular/standalone';
import { ItemLista } from '../../models/ItemLista.model'; // Asegúrate de que la ruta sea correcta
import { addIcons } from "ionicons";
import {closeCircleOutline} from "ionicons/icons";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    // Importar todos los módulos de Ionic usados en el HTML

    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonItem, IonInput, IonButton,
    IonLabel, IonList, IonCheckbox, IonIcon, RouterLink
  ]
})
export class CarritoPage implements OnInit {

  // 🔑 Tipado y Inicialización
  protected nuevoIngrediente: string = '';
  protected listaCompra: ItemLista[] = [];

  constructor() {
    addIcons({closeCircleOutline}); // Añadir el icono usado en el HTML
  }

  ngOnInit() {
    // Simulación de una lista de compra inicial
    this.listaCompra = [
      { nombre: '200g de harina', comprado: false },
      { nombre: '5 huevos grandes', comprado: false },
      { nombre: '1L de leche entera', comprado: true }
    ];
  }

  protected agregarIngrediente() {
    if (this.nuevoIngrediente && this.nuevoIngrediente.trim().length > 0) {
      const nuevoItem: ItemLista = {
        nombre: this.nuevoIngrediente.trim(),
        comprado: false
      };
      this.listaCompra.push(nuevoItem);
      this.nuevoIngrediente = ''; // Limpiar el input
    }
  }

  protected eliminarIngrediente(i: number) {
    // Elimina el elemento en la posición 'i'
    this.listaCompra.splice(i, 1);
  }
}
