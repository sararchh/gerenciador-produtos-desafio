export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  highlight: boolean;
  createdAt: Date;
}
