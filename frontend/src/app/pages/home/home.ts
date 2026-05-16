import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage implements OnInit {
  ngOnInit(): void {
    // Initialize carousel if needed
    const carouselElement = document.getElementById('carouselClinica');
    if (carouselElement) {
      new (window as any).bootstrap.Carousel(carouselElement, {
        interval: 5000,
        touch: true
      });
    }
  }
}
