import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class ContactoPage {
  formContacto: FormGroup;
  mostrarAlerta = false;

  constructor(private fb: FormBuilder) {
    this.formContacto = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formContacto.valid) {
      const datosContacto = this.formContacto.value;
      console.log('Datos de contacto:', datosContacto);

      // Aquí se enviaría al backend
      this.mostrarAlerta = true;
      this.formContacto.reset();

      setTimeout(() => {
        this.mostrarAlerta = false;
      }, 3000);
    }
  }

  cerrarAlerta(): void {
    this.mostrarAlerta = false;
  }
}
