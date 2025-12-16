export type DificultadType = 'Alta' | 'Media' | 'Baja';

export interface Receta {
  id: number;

  usuario_creador_id: number | null;
  id_foto: number | null;
  url_foto: string | null;

  preferencias: string[];

  nombre: string;
  descripcion: string | null;
  instrucciones: string | null;
  tiempo_preparacion: number | null;
  porciones: number | null;
  costo_estimado: number | null;
  valoracion_promedio: number | null;
  activa: boolean;

  dificultad: DificultadType;

  fecha_creacion: string;

}
