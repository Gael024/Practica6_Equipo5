import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  enviando = false;
  errorEnvio = false;

  // URL del microservicio de contacto
  private apiUrl = 'http://localhost:3003/api/contacto';

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
    if (this.formContacto.invalid) return;
 
    this.enviando = true;
    this.errorEnvio = false;
 
    // El backend espera "correo", el form usa "email" → mapeamos aquí
    const { email, ...resto } = this.formContacto.value;
    const payload = { ...resto, correo: email };
 
    this.http.post(this.apiUrl, payload).subscribe({
      next: () => {
        this.mostrarAlerta = true;
        this.enviando = false;
        this.formContacto.reset();
 
        setTimeout(() => {
          this.mostrarAlerta = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Error al enviar mensaje:', err);
        this.enviando = false;
        this.errorEnvio = true;
      },
    });
  }

  cerrarAlerta(): void {
    this.mostrarAlerta = false;
  }
}
