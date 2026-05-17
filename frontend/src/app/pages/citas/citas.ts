import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Cita, CitaInterface } from '../../services/cita';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './citas.html',
  styleUrl: './citas.scss',
})
export class CitasPage implements OnInit {
  citas: CitaInterface[] = [];
  citasFiltradas: CitaInterface[] = [];

  filtros = {
    especialidad: '',
    fechaDesde: '',
    fechaHasta: ''
  };

  constructor(private citaService: Cita) { }

ngOnInit(): void {

  this.citaService.citas$.subscribe(citas => {

    this.citas = citas;

    this.aplicarFiltros();

  });

  this.citaService.cargarCitas();

}

  // aplicarFiltros(): void {
  //   this.citasFiltradas = this.citas.filter(cita => {
  //     let cumpleEspecialidad = !this.filtros.especialidad || cita.especialidad === this.filtros.especialidad;
  //     let cumpeFechaDesde = !this.filtros.fechaDesde || cita.fechaCita >= this.filtros.fechaDesde;
  //     let cumpeFechaHasta = !this.filtros.fechaHasta || cita.fechaCita <= this.filtros.fechaHasta;

  //     return cumpleEspecialidad && cumpeFechaDesde && cumpeFechaHasta;
  //   });
  // }

  aplicarFiltros(): void {

  this.citasFiltradas = this.citas.filter(cita => {

    const cumpleEspecialidad =
      !this.filtros.especialidad ||
      cita.especialidad === this.filtros.especialidad;

    const cumpleFechaDesde =
      !this.filtros.fechaDesde ||
      cita.fechaCita >= this.filtros.fechaDesde;

    const cumpleFechaHasta =
      !this.filtros.fechaHasta ||
      cita.fechaCita <= this.filtros.fechaHasta;

    return (
      cumpleEspecialidad &&
      cumpleFechaDesde &&
      cumpleFechaHasta
    );

  });

}

  // limpiarFiltros(): void {
  //   this.filtros = {
  //     especialidad: '',
  //     fechaDesde: '',
  //     fechaHasta: ''
  //   };
  //   this.citasFiltradas = [...this.citas];
  // }
  limpiarFiltros(): void {
    this.filtros = {
      especialidad: '',
      fechaDesde: '',
      fechaHasta: ''
    };

    this.aplicarFiltros();
  }

  formatearFecha(fechaStr: string): string {
    const fecha = new Date(fechaStr + 'T00:00:00');
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return fecha.toLocaleDateString('es-ES', opciones);
  }

  // eliminarCita(id: number): void {
  //   if (confirm('¿Está seguro de que desea eliminar esta cita?')) {
  //     this.citaService.eliminarCita(id);
  //   }
  // }

  eliminarCita(id: number): void {

  if (confirm('¿Está seguro de que desea eliminar esta cita?')) {

    this.citaService.eliminarCita(id);

    this.citasFiltradas = this.citasFiltradas.filter(
      cita => cita.id !== id
    );

  }

}

  exportarATexto(): void {
    let contenido = 'REPORTE DE CITAS MÉDICAS\n';
    contenido += '========================\n\n';

    this.citasFiltradas.forEach(cita => {
      contenido += `ID: ${cita.id}\n`;
      contenido += `Paciente: ${cita.nombre}\n`;
      contenido += `Email: ${cita.correo}\n`;
      contenido += `Teléfono: ${cita.telefono}\n`;
      contenido += `Especialidad: ${cita.especialidad}\n`;
      contenido += `Fecha: ${this.formatearFecha(cita.fechaCita)}\n`;
      contenido += `Hora: ${cita.horaCita}\n`;
      contenido += '---\n\n';
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenido));
    element.setAttribute('download', 'citas_' + new Date().getTime() + '.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  actualizarEstado(id: number, estado: string): void {

  this.citaService.actualizarEstado(id, estado);

  const cita = this.citasFiltradas.find(
    c => c.id === id
  );

  if (cita) {
    cita.estado = estado;
  }

}





}
