import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../ts/interfaces/product.interface';
import { ProductFacade } from '../../facades/product.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private facade = inject(ProductFacade);

  searchQuery: string = '';
  products$ = this.facade.state$;

  dataSource = new MatTableDataSource<IProduct>();
  displayedColumns: string[] = [
    'highlight',
    'name',
    'description',
    'category',
    'price',
    'createdAt',
  ];

  onSearchChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;

    this.facade._filter.next(this.searchQuery);
  }
}
