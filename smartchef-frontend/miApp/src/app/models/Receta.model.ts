export interface Receta {
  id:number;
  usuario_creador_id: number | null;
  id_foto: number | null;
  nombre: string;
  descripcion: string | null;
  instrucciones: string | null;
  tiempo_preparacion: number | null;
  dificultad: string | null;
  costo_estimado: number | null;
  valoracion_promedio: number | null;
  fecha_creacion: string ; // fecha como ISO string
  activa: boolean
}
