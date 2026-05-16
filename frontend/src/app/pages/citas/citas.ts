import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Cita, CitaInterface } from '../../services/cita';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './citas.html',
  styleUrl: './citas.scss',
})
export class CitasPage implements OnInit {
  citas: CitaInterface[] = [];
  citasFiltradas: CitaInterface[] = [];
  formEditar: FormGroup;
  citaEnEdicion: CitaInterface | null = null;

  filtros = {
    especialidad: '',
    fechaDesde: '',
    fechaHasta: ''
  };

  constructor(
    private citaService: Cita,
    private fb: FormBuilder
  ) {
    this.formEditar = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      especialidad: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.citaService.citas$.subscribe(citas => {
      this.citas = citas;
      this.citasFiltradas = [...citas];
    });
  }

  aplicarFiltros(): void {
    this.citasFiltradas = this.citas.filter(cita => {
      let cumpleEspecialidad = !this.filtros.especialidad || cita.especialidad === this.filtros.especialidad;
      let cumpeFechaDesde = !this.filtros.fechaDesde || cita.fecha >= this.filtros.fechaDesde;
      let cumpeFechaHasta = !this.filtros.fechaHasta || cita.fecha <= this.filtros.fechaHasta;

      return cumpleEspecialidad && cumpeFechaDesde && cumpeFechaHasta;
    });
  }

  limpiarFiltros(): void {
    this.filtros = {
      especialidad: '',
      fechaDesde: '',
      fechaHasta: ''
    };
    this.citasFiltradas = [...this.citas];
  }

  formatearFecha(fechaStr: string): string {
    const fecha = new Date(fechaStr + 'T00:00:00');
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return fecha.toLocaleDateString('es-ES', opciones);
  }

  obtenerBadgeClase(estado: string): string {
    switch (estado) {
      case 'Programada':
        return 'badge-primary';
      case 'Confirmada':
        return 'badge-success';
      case 'Cancelada':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }

  abrirModalEditar(cita: CitaInterface): void {
    this.citaEnEdicion = cita;
    this.formEditar.patchValue({
      nombre: cita.nombre,
      email: cita.email,
      telefono: cita.telefono,
      especialidad: cita.especialidad,
      fecha: cita.fecha,
      hora: cita.hora,
      estado: cita.estado
    });

    const modal = new (window as any).bootstrap.Modal(document.getElementById('modalEditar'));
    modal.show();
  }

  guardarEdicion(): void {
    if (this.formEditar.valid && this.citaEnEdicion) {
      this.citaService.actualizarCita(this.citaEnEdicion.id, this.formEditar.value);
      this.citaEnEdicion = null;
    }
  }

  eliminarCita(id: string): void {
    if (confirm('¿Está seguro de que desea eliminar esta cita?')) {
      this.citaService.eliminarCita(id);
    }
  }

  exportarATexto(): void {
    let contenido = 'REPORTE DE CITAS MÉDICAS\n';
    contenido += '========================\n\n';

    this.citasFiltradas.forEach(cita => {
      contenido += `ID: ${cita.id}\n`;
      contenido += `Paciente: ${cita.nombre}\n`;
      contenido += `Email: ${cita.email}\n`;
      contenido += `Teléfono: ${cita.telefono}\n`;
      contenido += `Especialidad: ${cita.especialidad}\n`;
      contenido += `Fecha: ${this.formatearFecha(cita.fecha)}\n`;
      contenido += `Hora: ${cita.hora}\n`;
      contenido += `Estado: ${cita.estado}\n`;
      contenido += `Motivo: ${cita.motivo || 'N/A'}\n`;
      contenido += `Fecha de Registro: ${cita.fechaRegistro}\n`;
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
}
