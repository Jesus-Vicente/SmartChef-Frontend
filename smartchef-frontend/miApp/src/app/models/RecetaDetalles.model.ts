export type DificultadType = 'ALTA' | 'MEDIA' | 'BAJA';

export interface RecetaDetalles {
  id?: number;

  usuario_creador_id: number | null;
  id_foto: number | null;

  nombre: string;
  descripcion: string;
  instrucciones: string;
  dificultad: DificultadType;

  tiempo_preparacion: number;
  porciones: number;
  costo_estimado: number;
  valoracion_promedio: number | null;
  fecha_creacion: string;
  activa: boolean;

  nombresIngredientes: string[];
  idPreferencias: number[] | null;
}
