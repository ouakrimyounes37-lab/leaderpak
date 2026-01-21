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
    description: 'Expertise historique : notre gamme VEDAL, adaptable à tous les formats.',
    icon: 'fa-soap',
    image: 'https://image2url.com/r2/default/images/1768990041264-3476a6b1-30db-46ed-ba7e-35c195527c9d.webp',
    isHighlight: true
  },
  {
    id: 'cat2',
    name: 'Produits Plastiques',
    description: 'Solutions d\'injection plastique haute densité pour usage domestique et pro.',
    icon: 'fa-box-archive',
    image: 'https://image2url.com/r2/default/images/1769011151854-98223fbe-bc5b-4d3d-be3b-162a87c7ebb9.webp'
  },
  {
    id: 'cat3',
    name: 'Alum / Film Alimentaire',
    description: 'Conservation et cuisson : aluminium et film PVC qualité professionnelle pour la distribution.',
    icon: 'fa-film',
    image: 'https://image2url.com/r2/default/images/1769011154529-1a991eb3-62ed-416a-a1ee-72fa2364dec8.webp'
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
    image: 'https://image2url.com/r2/default/images/1769011150189-6e1fddd6-88cd-47b6-b80b-2a7b39cb38b7.webp',
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
    image: 'https://image2url.com/r2/default/images/1769011150189-6e1fddd6-88cd-47b6-b80b-2a7b39cb38b7.webp',
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
    image: 'https://image2url.com/r2/default/images/1768986123912-76ab0428-d0f2-474f-9f97-da7ae8e33afe.webp',
    highlights: ['Poignée ergonomique', 'Zéro contact', 'Pack de 3'],
    margin: '35%+',
    rotation: 'Haute'
  },
  {
    id: 'p-plast-6',
    name: 'Boîte à Charcuterie',
    category: 'Produits Plastiques',
    description: 'Boîte de conservation hermétique avec plateau de service intégré, idéale pour garder vos tranches fraîches.',
    image: 'https://image2url.com/r2/default/images/1769011156528-19290dd7-0c3b-4891-8c74-9397bc2a039b.webp',
    highlights: ['Hermétique', 'Plateau intégré', 'Sans BPA'],
    margin: '42%+',
    rotation: 'Haute'
  },
  {
    id: 'p-plast-7',
    name: 'Lot de 4 Brosses',
    category: 'Produits Plastiques',
    description: 'Brosses circulaires souples.',
    image: 'https://image2url.com/r2/default/images/1769011153366-3a212d52-3011-4d36-9680-4de6b01b0d09.webp',
    highlights: ['Doux', 'Ergonomique', 'Pack de 4'],
    margin: '50%+',
    rotation: 'Stable'
  },
  {
    id: 'p-plast-8',
    name: 'Raclette de Sol',
    category: 'Produits Plastiques',
    description: 'Tête de raclette large en plastique pour évacuer l’eau efficacement sur tous les types de sols.',
    image: 'https://image2url.com/r2/default/images/1768986118756-da0d766d-d0f5-4ce9-9bc0-8e89ca8f41f7.webp',
    highlights: ['Lame silicone', 'Manche adaptable', 'Ultra-léger'],
    margin: '45%+',
    rotation: 'Très Haute'
  },
  {
    id: 'p-plast-9',
    name: 'Organisateur de Porte',
    category: 'Produits Plastiques',
    description: 'Crochet vertical multi-niveaux à suspendre pour ranger sacs, chapeaux et accessoires sans percer.',
    image: 'https://image2url.com/r2/default/images/1768986120446-814bdcba-5ea9-4476-b2f4-728f62ee2e13.webp',
    highlights: ['Zéro perçage', 'Multi-niveaux', 'Gain de place'],
    margin: '40%+',
    rotation: 'Moyenne'
  },
  {
    id: 'p-plast-10',
    name: 'Set de Cintres Colorés',
    category: 'Produits Plastiques',
    description: 'Lot de cintres en plastique robuste avec encoches, parfaits pour organiser tous types de vêtements.',
    image: 'https://image2url.com/r2/default/images/1769011155558-39076379-0de3-45c6-ac13-0b56d25a3836.webp',
    highlights: ['Antiglisse', 'Robuste', 'Coloris vifs'],
    margin: '38%+',
    rotation: 'Très Haute'
  },
  {
    id: 'p-alu-5',
    name: 'Pack Cuisine 3-en-1',
    category: 'Alum / Film Alimentaire',
    description: 'Trio économique comprenant film étirable (100m), aluminium (50m) et papier cuisson (30m).',
    image: 'https://image2url.com/r2/default/images/1769011154529-1a991eb3-62ed-416a-a1ee-72fa2364dec8.webp',
    highlights: ['Pack Eco', 'Multi-usage', 'Conservation pro'],
    margin: '45%+',
    rotation: 'Très Haute'
  }
];