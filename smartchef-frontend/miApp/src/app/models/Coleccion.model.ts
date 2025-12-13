export interface Coleccion {
  id: number;
  nombreColeccion: string; // Coincide con el backend
  descripcion: string;     // Coincide con el backend
  fecha_creacion: string;  // Mapeo de Timestamp a string

  // 🔑 Campo calculado en el backend (SELECT COUNT(coleccion_receta))
  cantidadRecetas: number;
}
