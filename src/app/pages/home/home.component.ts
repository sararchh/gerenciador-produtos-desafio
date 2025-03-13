import { Component, inject, AfterViewInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../ts/interfaces/product.interface';
import { ProductFacade } from '../../facades/product.facade';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

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
    MatSortModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  private facade = inject(ProductFacade);

  searchQuery: string = '';
  products$ = this.facade.state$.pipe(
    map(products => {
      return products.data.sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0));
    })
  );

  dataSource = new MatTableDataSource<IProduct>();
  displayedColumns: string[] = [
    'highlight',
    'name',
    'description',
    'category',
    'price',
    'createdAt',
    'actions',
  ];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'highlight': return item.highlight ? 1 : 0;
        default: return (item as any)[property];
      }
    };
    this.products$.subscribe(products => {
      this.dataSource.data = products;
    });
  }

  onSearchChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;

    this.facade._filter.next(this.searchQuery);
  }

  editProduct(product: IProduct) {
    console.log('Edit product:', product);
  }

  deleteProduct(product: IProduct) {
    console.log('Delete product:', product);
  }
}
