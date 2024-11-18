// src/app/models/revision.model.ts
export interface Revision {
  id?: number; // El ID es opcional ya que es generado automáticamente
  fechaRevision: Date; // Fecha de la revisión
  resultadoRevision: boolean; // Resultado de la revisión (aprobado o rechazado)
  vehiculoPlaca: string; // Placa del vehículo asociado
}
