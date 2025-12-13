import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Añadir DatePipe para el ejemplo
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {personCircleOutline} from "ionicons/icons";
import {Usuario} from "../../models/Usuario.model"; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    // Componentes de Ionic:
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ],
  providers: [DatePipe] // Proveedor para formatear fechas
})
export class PerfilPage implements OnInit {

  // Inicializamos la propiedad con la estructura completa de Usuario
  protected datosUsuario: Usuario = {
    id: 0,
    nombre: '',
    email: '',
    password: '',
    direccion: '',
    ciudad: '',
    pais: '',
    codigo_postal: '',
    telefono: '',
    fecha_registro: '' // Usamos string, como en la interfaz
  };

  constructor() {
    addIcons({personCircleOutline});
  }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    // SIMULACIÓN: Datos de usuario completos usando la interfaz
    this.datosUsuario = {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan.perez@smartchef.com",
      password: "NO_MOSTRAR",
      direccion: "Calle Falsa 123",
      ciudad: "Málaga",
      pais: "España",
      codigo_postal: "29001",
      telefono: "600 123 456",
      fecha_registro: "2024-08-15T10:00:00Z" // Formato ISO 8601, más fácil de formatear
    };
    console.log("Datos de usuario cargados:", this.datosUsuario);
  }

  cerrarSesion(): void {
    console.log("Simulación: Cerrando sesión.");
  }

}
