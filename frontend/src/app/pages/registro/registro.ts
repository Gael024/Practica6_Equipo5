import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cita, CitaInterface } from '../../services/cita';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class RegistroPage implements OnInit {
  formCita: FormGroup;
  mostrarAlerta = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private citaService: Cita,
    private router: Router
  ) {
    this.formCita = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      especialidad: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      motivo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaMin = `${anio}-${mes}-${dia}`;

    const inputFecha = document.getElementById('fecha') as HTMLInputElement;
    if (inputFecha) {
      inputFecha.setAttribute('min', fechaMin);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formCita.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.formCita.valid) {
      return;
    }

    const nuevaCita: CitaInterface = {
      id: this.citaService.generarID(),
      nombre: this.formCita.value.nombre,
      email: this.formCita.value.email,
      telefono: this.formCita.value.telefono,
      especialidad: this.formCita.value.especialidad,
      fecha: this.formCita.value.fecha,
      hora: this.formCita.value.hora,
      motivo: this.formCita.value.motivo,
      estado: 'Programada',
      fechaRegistro: new Date().toLocaleString()
    };

    this.citaService.agregarCita(nuevaCita);

    this.mostrarAlerta = true;
    this.formCita.reset();
    this.submitted = false;

    setTimeout(() => {
      this.router.navigate(['/citas']);
    }, 2000);
  }

  cerrarAlerta(): void {
    this.mostrarAlerta = false;
  }
}
