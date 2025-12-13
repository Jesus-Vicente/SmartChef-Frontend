export interface RecetaFavorita {
  id: number; // ID del registro Favorito (para navegación o eliminación)

  // Datos de la Receta (los mínimos necesarios para listar)
  nombre: string;
  tiempo_preparacion: number;

  // Datos del Favorito
  fecha_guardado: string;
}
