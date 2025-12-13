export interface RegistroHistorial {
  id: number;

  // Datos principales que se listarán (vienen de la entidad relacionada Receta)
  nombreReceta: string;

  // Datos de la entidad Historial:
  fecha_realizacion: string; // Usamos string, ya que LocalDateTime se mapeará a string/ISO
  duracion: number;
  estado: 'completada' | 'en_proceso';

  // Campos opcionales que se podrían mostrar:
  calificacion?: number;
  comentario?: string;
}
