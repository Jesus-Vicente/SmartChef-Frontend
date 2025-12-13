export interface RecetaCrear {
  nombre: string;
  descripcion: string;
  instrucciones: string[];
  dificultad: 'BAJA' | 'MEDIA' | 'ALTA';
  tiempo_preparacion: number;
  costo_estimado: number;
  porciones: number;

  id_foto: number | null;
  nombresIngredientes: string[];

  foto: string;
}
