
export enum TourStep {
  LANDING = 0,
  VALUE_PROP = 1,
  HERO_PRODUCT = 2,
  CATALOG = 3,
  TERMS = 4,
  CREDIBILITY = 5,
  CONVERSION = 6,
  QUICK_PRICES = 7,
  DASHBOARD = 8,
  ADMIN_LOGIN = 9,
  ADMIN_STATS = 10
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  description: string;
  usage: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  highlights: string[];
  rotation: string;
  variants?: ProductVariant[];
}

export interface CompanyStat {
  label: string;
  value: string;
  icon: string;
}

export interface VisitLog {
  id?: number;
  url: string;
  created_at: string;
  ip: string;
  device: string;
  browser: string;
  source: string;
}
