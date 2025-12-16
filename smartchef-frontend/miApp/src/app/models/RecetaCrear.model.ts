import {IngredienteReceta} from "./IngredienteReceta.model";

export interface RecetaCrear {
  nombre: string;
  descripcion: string;
  instrucciones: string[];
  dificultad: 'BAJA' | 'MEDIA' | 'ALTA';
  tiempo_preparacion: number;
  costo_estimado: number;
  porciones: number;

  idUsuarioCreador: number | null;
  id_foto: number | null;
  url_foto: string | null;

  ingredientesConDetalle: IngredienteReceta[];

  idPreferencias: number[] | null;


}
