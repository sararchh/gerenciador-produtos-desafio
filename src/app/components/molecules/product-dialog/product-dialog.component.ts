import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { IProduct } from '../../../ts/interfaces/product.interface';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface DialogData {
  product: IProduct;
}

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss',
})
export class ProductDialogComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<ProductDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly product = this.data.product;

  private fb = inject(FormBuilder);

  form = this.fb.group({
    id: [this.data.product.id],
    name: [this.data.product.name, Validators.required],
    description: [this.data.product.description, Validators.required],
    price: [this.data.product.price, [Validators.required, Validators.min(0)]],
    category: [this.data.product.category, Validators.required],
    highlight: [this.data.product.highlight],
    createdAt: [this.data.product.createdAt],
  });


  ngOnInit(): void {
    this.form.patchValue(this.data.product);
  }

  get formValue() {
    return this.form.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.formValue);
    }
  }
}
