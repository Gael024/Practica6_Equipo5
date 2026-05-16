import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CitaInterface {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  especialidad: string;
  fecha: string;
  hora: string;
  motivo: string;
  estado: string;
  fechaRegistro: string;
}

@Injectable({
  providedIn: 'root',
})
export class Cita {
  private citasSubject = new BehaviorSubject<CitaInterface[]>([]);
  public citas$ = this.citasSubject.asObservable();

  constructor() {
    this.cargarCitas();
  }

  private cargarCitas(): void {
    const citasStorage = localStorage.getItem('citas');
    const citas = citasStorage ? JSON.parse(citasStorage) : [];
    this.citasSubject.next(citas);
  }

  getCitas(): CitaInterface[] {
    return this.citasSubject.value;
  }

  agregarCita(cita: CitaInterface): void {
    const citas = this.citasSubject.value;
    citas.push(cita);
    localStorage.setItem('citas', JSON.stringify(citas));
    this.citasSubject.next([...citas]);
  }

  actualizarCita(id: string, citaActualizada: Partial<CitaInterface>): void {
    const citas = this.citasSubject.value;
    const index = citas.findIndex(c => c.id === id);
    if (index !== -1) {
      citas[index] = { ...citas[index], ...citaActualizada };
      localStorage.setItem('citas', JSON.stringify(citas));
      this.citasSubject.next([...citas]);
    }
  }

  eliminarCita(id: string): void {
    const citas = this.citasSubject.value.filter(c => c.id !== id);
    localStorage.setItem('citas', JSON.stringify(citas));
    this.citasSubject.next(citas);
  }

  obtenerCita(id: string): CitaInterface | undefined {
    return this.citasSubject.value.find(c => c.id === id);
  }

  generarID(): string {
    return 'CIT-' + Date.now() + Math.random().toString(36).substr(2, 9);
  }
}
