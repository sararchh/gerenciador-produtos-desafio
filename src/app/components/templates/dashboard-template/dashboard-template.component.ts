import { Component } from '@angular/core';
import { HeaderComponent } from '../../molecules/header/header.component';

@Component({
  selector: 'app-dashboard-template',
  imports: [HeaderComponent],
  standalone: true,
  templateUrl: './dashboard-template.component.html',
  styleUrl: './dashboard-template.component.scss',
})
export class DashboardTemplateComponent {}
