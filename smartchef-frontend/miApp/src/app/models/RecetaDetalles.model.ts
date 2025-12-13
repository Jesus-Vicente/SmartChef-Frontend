import {Ingrediente} from "./Ingrediente.model";
import {Foto} from "./Foto.model";

export interface RecetaDetalles {
  id: number;
  nombre: string;
  descripcion: string;
  instrucciones: string;
  dificultad: string;
  tiempo_preparacion: number;
  costo_estimado: number;
  porciones: number;
  valoracion_promedio: number;

  ingredientes: Ingrediente[];

  foto: string;

}
