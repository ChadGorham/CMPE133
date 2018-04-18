import { Component } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
 
@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval:4000, noPause: true, showIndicators: true } }
  ]
})
export class SlidesComponent {}
