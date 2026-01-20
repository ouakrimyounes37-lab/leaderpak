
import { Product, CompanyStat } from './types.ts';

export const COMPANY_STATS: CompanyStat[] = [
  { label: 'Fondée en', value: '2013', icon: 'fa-calendar-days' },
  { label: 'Approvisionnement sûr', value: 'Fiabilité', icon: 'fa-shield-halved' },
  { label: 'Normes contrôlées', value: 'Qualité', icon: 'fa-award' },
  { label: 'Partenaire durable', value: 'Innovation', icon: 'fa-handshake' }
];

export const OUR_BRANDS = [
  { name: 'PRO-SHINE', icon: 'fa-sparkles', color: 'text-blue-500' },
  { name: 'CLEAN-MASTER', icon: 'fa-broom', color: 'text-cyan-500' },
  { name: 'ECO-PLAST', icon: 'fa-recycle', color: 'text-green-500' },
  { name: 'ALU-PRO', icon: 'fa-scroll', color: 'text-slate-400' },
  { name: 'HYGIENA', icon: 'fa-hand-holding-medical', color: 'text-red-400' },
  { name: 'DURAMAX', icon: 'fa-shield-halved', color: 'text-indigo-500' },
  { name: 'SOFT-TOUCH', icon: 'fa-feather', color: 'text-pink-400' },
  { name: 'PURE-SOAP', icon: 'fa-soap', color: 'text-blue-300' },
  { name: 'METAL-X', icon: 'fa-cube', color: 'text-slate-600' },
  { name: 'BRITE-WAY', icon: 'fa-sun', color: 'text-yellow-500' }
];

export const VISION_CATEGORIES = [
  {
    id: 'cat1',
    name: 'Éponge Métallique',
    description: 'Expertise historique : notre gamme Pro-Shine en inox 410, adaptable à tous les formats.',
    icon: 'fa-soap',
    image: 'https://image2url.com/r2/default/images/1768905214686-68eef7f2-9fea-4bd7-b2c3-14a548b87403.webp',
    isHighlight: true
  },
  {
    id: 'cat2',
    name: 'Produits Plastiques',
    description: 'Seaux, pelles, et solutions d\'injection plastique haute densité pour usage domestique et pro.',
    icon: 'fa-box-archive',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'cat3',
    name: 'Alum / Film Alimentaire',
    description: 'Conservation et cuisson : aluminium et film PVC qualité professionnelle pour la distribution.',
    icon: 'fa-film',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143af7bf?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'cat4',
    name: 'Savon Beldi / Nettoyant sol',
    description: 'Hygiène traditionnelle et moderne : formulations performantes pour une propreté impeccable.',
    icon: 'fa-pump-medical',
    image: 'https://images.unsplash.com/photo-1550966841-39145908001e?q=80&w=400&auto=format&fit=crop'
  }
];

export const HERO_SPONGES: any[] = [
  {
    id: 's1',
    name: 'Éponge à spirale (Pack 3+1)',
    price: 0.40,
    description: 'L\'éponge Vedal haute performance pour un usage quotidien intensif.',
    usage: 'Nettoyage intensif cuisine',
    image: 'https://image2url.com/r2/default/images/1768905214686-68eef7f2-9fea-4bd7-b2c3-14a548b87403.webp',
    tech: {
      material: 'Acier Inoxydable',
      weight: '20g',
      density: 'Haute',
      packaging: 'Carton Master de 240 unités (10 packs de 24)'
    }
  },
  {
    id: 's2',
    name: 'Éponge Power Inox (Pack 1+1)',
    price: 0.55,
    description: 'Le récurage plat ultra-puissant qui dure 5 fois plus longtemps.',
    usage: 'Usage professionnel / Collectivités',
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=400&auto=format&fit=crop',
    tech: {
      material: 'Acier Inoxydable',
      weight: '40g',
      density: 'Ultra-compacte',
      packaging: 'Carton Master de 120 unités (Bulk)'
    }
  },
  {
    id: 's3',
    name: 'Lavettes Mailles Inox (x5)',
    price: 0.48,
    description: "La souplesse d'un chiffon alliée à la force de l'acier.",
    usage: 'Céramique et vitrocéramique',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=400&auto=format&fit=crop',
    tech: {
      material: 'Acier Inoxydable',
      weight: '18g',
      density: 'Moyenne',
      packaging: 'Display Box de 48 unités'
    }
  },
  {
    id: 's4',
    name: 'Éponges À Récurer avec Poignée (x3)',
    price: 1.10,
    description: 'Un récurage impeccable sans jamais se mouiller les mains.',
    usage: 'Consommation domestique',
    image: 'https://images.unsplash.com/photo-1550966841-39145908001e?q=400&auto=format&fit=crop',
    tech: {
      material: 'Acier Inoxydable',
      weight: '15g x 3',
      density: 'Standard',
      packaging: 'Flowpack imprimé avec code-barres EAN13'
    }
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p-vedal-1',
    name: 'Éponge à spirale (Pack 3+1)',
    category: 'Éponge Métallique',
    description: 'L\'éponge Vedal haute performance pour un usage quotidien intensif.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    highlights: ['Pack économique', 'Inox pur', 'Usage intensif'],
    margin: '35%+',
    rotation: 'Haute'
  },
  {
    id: 'p-vedal-2',
    name: 'Éponge Power Inox (Pack 1+1)',
    category: 'Éponge Métallique',
    description: 'Le récurage plat ultra-puissant qui dure 5 fois plus longtemps.',
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=800&auto=format&fit=crop',
    highlights: ['Ultra-puissant', 'Longue durée', 'Qualité Pro'],
    margin: '35%+',
    rotation: 'Stable'
  },
  {
    id: 'p-vedal-3',
    name: 'Lavettes Mailles Inox (x5)',
    category: 'Éponge Métallique',
    description: "La souplesse d'un chiffon alliée à la force de l'acier.",
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=800&auto=format&fit=crop',
    highlights: ['Souplesse acier', 'Anti-odeur', 'Lavable'],
    margin: '35%+',
    rotation: 'Haute'
  },
  {
    id: 'p-vedal-4',
    name: 'Éponges À Récurer avec Poignée (x3)',
    category: 'Éponge Métallique',
    description: 'Un récurage impeccable sans jamais se mouiller les mains.',
    image: 'https://images.unsplash.com/photo-1550966841-39145908001e?q=80&w=800&auto=format&fit=crop',
    highlights: ['Poignée ergonomique', 'Zéro contact', 'Pack de 3'],
    margin: '35%+',
    rotation: 'Haute'
  }
];
