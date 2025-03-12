import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../ts/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = '/products';
  private http = inject(HttpClient);

  get(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl);
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, product);
  }

  createMany(products: any): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(`${this.baseUrl}/many`, products);
  }

  update(id: string, product: IProduct): Observable<IProduct> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<IProduct>(url, product);
  }

  delete(id: string): Observable<IProduct> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<IProduct>(url);
  }
}
