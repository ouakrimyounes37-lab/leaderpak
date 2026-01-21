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
    image: 'https://image2url.com/r2/default/images/1768905214686-68eef7f2-9fea-4bd7-b2c3-14a548b87403.webp'
  },
  {
    id: 'cat3',
    name: 'Alum / Film Alimentaire',
    description: 'Conservation et cuisson : aluminium et film PVC qualité professionnelle pour la distribution.',
    icon: 'fa-film',
    image: 'https://image2url.com/r2/default/images/1768905214686-68eef7f2-9fea-4bd7-b2c3-14a548b87403.webp'
  }
];

export const HERO_SPONGES: any[] = [
  {
    id: 's1',
    name: 'Éponge à spirale (Pack 3+1)',
    price: 0.40,
    description: 'L\'éponge Vedal haute performance pour un usage quotidien intensif.',
    usage: 'Nettoyage intensif cuisine',
    image: 'https://image2url.com/r2/default/images/1768986128156-6c413006-2295-4704-b1fc-d47c1f5867ed.webp',
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
    image: 'https://image2url.com/r2/default/images/1768986125616-27ba249b-d9d8-467b-81e1-385d5de83b24.webp',
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
    image: 'https://image2url.com/r2/default/images/1768986112563-0c2625cd-e5af-43fe-928e-4db2eda7e77f.webp',
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
    image: 'https://image2url.com/r2/default/images/1768986123912-76ab0428-d0f2-474f-9f97-da7ae8e33afe.webp',
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
    image: 'https://image2url.com/r2/default/images/1768986128156-6c413006-2295-4704-b1fc-d47c1f5867ed.webp',
    highlights: ['Pack économique', 'Inox pur', 'Usage intensif'],
    margin: '35%+',
    rotation: 'Haute'
  },
  {
    id: 'p-vedal-2',
    name: 'Éponge Power Inox (Pack 1+1)',
    category: 'Éponge Métallique',
    description: 'Le récurage plat ultra-puissant qui dure 5 fois plus longtemps.',
    image: 'https://image2url.com/r2/default/images/1768986125616-27ba249b-d9d8-467b-81e1-385d5de83b24.webp',
    highlights: ['Ultra-puissant', 'Longue durée', 'Qualité Pro'],
    margin: '35%+',
    rotation: 'Stable'
  },
  {
    id: 'p-vedal-3',
    name: 'Lavettes Mailles Inox (x5)',
    category: 'Éponge Métallique',
    description: "La souplesse d'un chiffon alliée à la force de l'acier.",
    image: 'https://image2url.com/r2/default/images/1768986112563-0c2625cd-e5af-43fe-928e-4db2eda7e77f.webp',
    highlights: ['Souplesse acier', 'Anti-odeur', 'Lavable'],
    margin: '35%+',
    rotation: 'Haute'
  },
  {
    id: 'p-vedal-4',
    name: 'Éponges À Récurer avec Poignée (x3)',
    category: 'Éponge Métallique',
    description: 'Un récurage impeccable sans jamais se mouiller les mains.',
    image: 'https://image2url.com/r2/default/images/1768905214686-68eef7f2-9fea-4bd7-b2c3-14a548b87403.webp',
    highlights: ['Poignée ergonomique', 'Zéro contact', 'Pack de 3'],
    margin: '35%+',
    rotation: 'Haute'
  },
  {
    id: 'p-plast-1',
    name: 'Seau Gradué 10L Renforcé',
    category: 'Produits Plastiques',
    description: 'Seau industriel en polypropylène haute densité avec graduation interne.',
    image: 'https://image2url.com/r2/default/images/1768905214686-68eef7f2-9fea-4bd7-b2c3-14a548b87403.webp',
    highlights: ['PP-HD incassable', 'Anse métal anticorrosion', 'Graduation précise'],
    margin: '40%+',
    rotation: 'Très Haute'
  },
  {
    id: 'p-plast-2',
    name: 'Bassine Ronde 15L Premium',
    category: 'Produits Plastiques',
    description: 'Bassine multifonction ergonomique pour usage domestique ou professionnel.',
    image: 'https://images.unsplash.com/photo-1590422443857-45607b30c6a3?q=80&w=800&auto=format&fit=crop',
    highlights: ['Bords arrondis', 'Finition lisse', 'Coloris assortis'],
    margin: '38%+',
    rotation: 'Haute'
  },
  {
    id: 'p-plast-3',
    name: 'Pelle à Poussière Pro',
    category: 'Produits Plastiques',
    description: 'Pelle rigide avec lèvre en caoutchouc pour une récupération parfaite.',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=800&auto=format&fit=crop',
    highlights: ['Lèvre souple', 'Fixation manche', 'Plastique antichoc'],
    margin: '45%+',
    rotation: 'Stable'
  },
  {
    id: 'p-plast-4',
    name: 'Corbeille à Papier Aérée',
    category: 'Produits Plastiques',
    description: 'Design moderne et aéré pour bureaux et espaces collectifs.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop',
    highlights: ['Design mesh', 'Légère et robuste', 'Facile à nettoyer'],
    margin: '42%+',
    rotation: 'Moyenne'
  },
  {
    id: 'p-plast-5',
    name: 'Caisse de Rangement 30L',
    category: 'Produits Plastiques',
    description: 'Solution de stockage empilable avec couvercle clipsable sécurisé.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143af7bf?q=80&w=800&auto=format&fit=crop',
    highlights: ['Empilable', 'Transparent / Opaque', 'Couvercle inclus'],
    margin: '35%+',
    rotation: 'Haute'
  },
  {
    id: 'p-alu-1',
    name: 'Rouleau Aluminium 30m Pro',
    category: 'Alum / Film Alimentaire',
    description: 'Aluminium haute résistance pour cuisson et conservation longue durée.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143af7bf?q=80&w=800&auto=format&fit=crop',
    highlights: ['Épaisseur renforcée', 'Boîte distributrice', '100% Recyclable'],
    margin: '30%+',
    rotation: 'Très Haute'
  },
  {
    id: 'p-alu-2',
    name: 'Film Étirable 50m Auto-Adhésif',
    category: 'Alum / Film Alimentaire',
    description: 'Film PVC qualité contact alimentaire avec système de découpe facile.',
    image: 'https://images.unsplash.com/photo-1590422443681-643f803f2613?q=80&w=800&auto=format&fit=crop',
    highlights: ['Anti-buée', 'Forte adhérence', 'Sans phtalates'],
    margin: '35%+',
    rotation: 'Haute'
  },
  {
    id: 'p-alu-3',
    name: 'Papier Cuisson Anti-Adhésif 20m',
    category: 'Alum / Film Alimentaire',
    description: 'Papier sulfurisé double face siliconé pour une cuisson sans graissage.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    highlights: ['Résiste à 220°C', 'Biodégradable', 'Format standard'],
    margin: '40%+',
    rotation: 'Stable'
  },
  {
    id: 'p-alu-4',
    name: 'Papier Aluminium 10m Usage Quotidien',
    category: 'Alum / Film Alimentaire',
    description: 'Version compacte idéale pour les besoins domestiques rapides.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143af7bf?q=80&w=800&auto=format&fit=crop',
    highlights: ['Économique', 'Souple', 'Protège des odeurs'],
    margin: '25%+',
    rotation: 'Haute'
  }
];
