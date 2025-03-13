import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';

import { ProductService } from '../services/product.service';
import { IProduct } from '../ts/interfaces/product.interface';
import { ProductStore } from '../stores/product.store';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  private service = inject(ProductService);
  private store = inject(ProductStore);

  readonly _filter = new BehaviorSubject<string>('');
  readonly filter$ = this._filter.asObservable().pipe(distinctUntilChanged());

  private readonly handleRequest$ = this.filter$.pipe(
    switchMap(() => this.get(this._filter.value))
  );

  readonly state$ = combineLatest([
    this.store.state$,
    this.handleRequest$,
  ]).pipe(
    map(([state]) => state),
    shareReplay({ refCount: true })
  );

  get(filter?: string): Observable<IProduct[]> {
    return this.service.get().pipe(
      map((products) => {
        return products.filter((product) => {
          return (
            product.name.toLowerCase().includes(filter?.toLowerCase() || '') ||
            product.category.toLowerCase().includes(filter?.toLowerCase() || '')
          );
        });
      }),
      tap((filteredProducts) => {
        this.store.update(filteredProducts);
      }),
      shareReplay({ refCount: true })
    );
  }

  create(product: IProduct): Observable<IProduct> {
    return this.service.create(product);
  }

  update(id: string, product: IProduct): Observable<IProduct> {
    return this.service.update(id, product);
  }

  delete(id: string): Observable<void> {
    return this.service.delete(id).pipe(
      tap(() => {
        this.store.remove(id);
      })
    );
  }
}
