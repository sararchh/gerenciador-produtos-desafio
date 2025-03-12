import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../ts/interfaces/product.interface';

export const INITIAL_STATE = {
  data: [] as IProduct[],
};

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  private readonly _state = new BehaviorSubject(INITIAL_STATE);
  readonly state$ = this._state.asObservable();

  constructor() {}

  public update(state: IProduct[]) {
    this._state.next({ ...this._state.value, data: state });

    return this.state$;
  }

  public updateCurrent(product: IProduct) {
    const state = this._state.value;

    const productIndex = state.data.findIndex(({ _id }) => _id === product._id);

    if (productIndex >= 0) {
      state.data[productIndex] = {
        ...state.data[productIndex],
        ...product,
      };
    } else {
      state.data.push(product);
    }

    this._state.next({
      ...state,
    });

    return this.state$;
  }
}
