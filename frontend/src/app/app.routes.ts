import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { RegistroPage } from './pages/registro/registro';
import { CitasPage } from './pages/citas/citas';
import { ContactoPage } from './pages/contacto/contacto';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'registro', component: RegistroPage },
  { path: 'citas', component: CitasPage },
  { path: 'contacto', component: ContactoPage },
  { path: '**', redirectTo: '' }
];
