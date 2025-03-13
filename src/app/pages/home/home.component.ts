import { CommonModule } from '@angular/common';
import { SubSink } from 'subsink';
import { Component, inject, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { IProduct } from '../../ts/interfaces/product.interface';
import { ProductFacade } from '../../facades/product.facade';
import { ConfirmDialogComponent } from '../../components/molecules/confirm-dialog/confirm-dialog.component';

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
    MatDialogModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private facade = inject(ProductFacade);
  private dialog = inject(MatDialog);
  private subs = new SubSink();

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
    'actions',
  ];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    this.subs.sink = this.products$.subscribe((products) => {
      this.dataSource.data = products.data;
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: `Você realmente deseja deletar o produto ${product.name}?`,
      },
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subs.sink = this.facade.delete(product.id).subscribe();
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
