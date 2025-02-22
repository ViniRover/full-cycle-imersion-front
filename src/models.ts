export type Asset = {
  _id: string;
  name: string;
  symbol: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AssetDaily = {
  _id: string;
  asset: Asset;
  price: number;
  date: string;
}

export type WalletAsset = {
  _id: string;
  asset: Asset;
  shares: number;
}

export type Wallet = {
  _id: string;
  assets: WalletAsset[];
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED'
}

export type Order = {
  _id: string;
  asset: Asset;
  shares: number;
  partial: number;
  price: number;
  type: OrderType;
  status: OrderStatus;
}