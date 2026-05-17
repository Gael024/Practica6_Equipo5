import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CitaInterface {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  especialidad: string;
  fechaCita: string;
  horaCita: string;
  estado?: string;
}

// Interfaz para crear una cita (sin id, lo genera la BD)
export interface CreateCitaDto {
  nombre: string;
  correo: string;
  telefono: string;
  especialidad: string;
  fechaCita: string;
  horaCita: string;
}

@Injectable({
  providedIn: 'root',
})
export class Cita {


  //private apiUrl = 'http://localhost:3001/citas';
  private apiAgendarUrl = 'http://localhost:3001/citas';
  private apiCitasMedicasUrl = 'http://localhost:3002/citas';
  private citasSubject = new BehaviorSubject<CitaInterface[]>([]);
  public citas$ = this.citasSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarCitas();
  }

  // Cargar todas las citas desde el backend
  cargarCitas(): void {
    this.http.get<CitaInterface[]>(this.apiCitasMedicasUrl).subscribe({
      next: (citas) => this.citasSubject.next(citas),
      error: (err) => console.error('Error al cargar citas:', err)
    });
  }

  getCitas(): CitaInterface[] {
    return this.citasSubject.value;
  }

  // Registrar una nueva cita en el backend (POST)
  agregarCita(cita: CreateCitaDto): Observable<CitaInterface> {
    const obs = this.http.post<CitaInterface>(this.apiAgendarUrl, cita);
    obs.subscribe({
      next: () => this.cargarCitas(), // Recargar la lista después de agregar
      error: (err) => console.error('Error al registrar cita:', err)
    });
    return obs;
  }

  // Obtener una cita por ID
  obtenerCita(id: number): Observable<CitaInterface> {
    return this.http.get<CitaInterface>(`${this.apiAgendarUrl}/${id}`);
  }

  // Eliminar una cita (DELETE)
  eliminarCita(id: number): void {
    this.http.delete(`${this.apiCitasMedicasUrl}/${id}`).subscribe({
      next: () => this.cargarCitas(),
      error: (err) => console.error('Error al eliminar cita:', err)
    });
  }

  actualizarEstado(id: number, estado: string): void {
    this.http.patch(
      `${this.apiCitasMedicasUrl}/${id}/estado`,
      { estado }
    ).subscribe({
      next: () => this.cargarCitas(),
      error: (err) => console.error('Error al actualizar estado:', err)
    });
  }

}
