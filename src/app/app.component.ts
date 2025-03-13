import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardTemplateComponent } from './components/templates/dashboard-template/dashboard-template.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DashboardTemplateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'store-front';
}
