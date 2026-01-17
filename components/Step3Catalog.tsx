import React, { useState, useEffect } from 'react';
import { PRODUCTS, VISION_CATEGORIES } from '../constants';
import { Product } from '../types';

interface Props {
  onNext: () => void;
  onPrev: () => void;
  initialFilter: string;
}

const Step3Catalog: React.FC<Props> = ({ onNext, onPrev, initialFilter }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  const categories = ['Tous', ...VISION_CATEGORIES.map(c => c.name)];
  const filteredProducts = activeFilter === 'Tous' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <div className="p-4 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm">Étape 03 — Catalogue</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-1 md:mt-2">Gamme Complète</h2>
            <p className="text-slate-500 mt-2 text-sm md:text-lg leading-relaxed">Diversifiez votre offre avec nos produits essentiels certifiés.</p>
        </div>

        {/* Barre de Filtres - Responsive */}
        <div className="mb-8 md:mb-12 relative">
            {/* Version Mobile : Bouton de filtrage */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-between px-5 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 shadow-sm active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <i className="fas fa-filter text-blue-600"></i>
                  <span>{activeFilter === 'Tous' ? 'Toutes les catégories' : activeFilter}</span>
                </div>
                <i className={`fas fa-chevron-down transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {isFilterOpen && (
                <div className="absolute top-full left-0 right-0 z-30 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 flex flex-col gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveFilter(cat); setIsFilterOpen(false); }}
                      className={`text-left px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                        activeFilter === cat ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Version Desktop : Boutons horizontaux */}
            <div className="hidden md:flex flex-wrap gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                            activeFilter === cat 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                            : 'bg-transparent text-slate-500 hover:bg-white hover:text-slate-900'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {filteredProducts.map((product) => (
                  <div key={product.id} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                      <div className="relative h-44 md:h-48 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute top-3 left-3">
                              <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[9px] md:text-[10px] font-bold text-blue-600 shadow-sm uppercase tracking-widest">{product.category}</span>
                          </div>
                      </div>
                      <div className="p-5 md:p-6">
                          <h3 className="text-lg md:text-xl font-bold mb-2">{product.name}</h3>
                          <p className="text-slate-500 text-xs md:text-sm mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
                          <button onClick={() => setSelectedProduct(product)} className="w-full py-3.5 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-[10px] md:text-xs uppercase tracking-widest">
                              Fiche Technique <i className="fas fa-expand"></i>
                          </button>
                      </div>
                  </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 mb-16">
              <i className="fas fa-search text-slate-300 text-4xl mb-4"></i>
              <div className="text-slate-500 font-bold">Aucun produit trouvé.</div>
          </div>
        )}

        {/* Pop-up Fiche Technique - Responsive Plein Écran */}
        {selectedProduct && (
            <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-3 md:p-4 overflow-y-auto">
                <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-scale-in my-auto max-h-[95vh] flex flex-col">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 overflow-y-auto">
                        <div className="md:w-1/2 shrink-0">
                            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full rounded-2xl shadow-lg" />
                        </div>
                        <div className="md:w-1/2">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl md:text-2xl font-bold">{selectedProduct.name}</h3>
                                <button onClick={() => setSelectedProduct(null)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <p className="text-slate-500 text-sm mb-6">{selectedProduct.description}</p>
                            <div className="space-y-3 mb-8">
                                {selectedProduct.highlights.map((h, i) => (
                                    <div key={i} className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                                        <i className="fas fa-circle-check text-blue-500 shrink-0"></i>
                                        {h}
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setSelectedProduct(null)} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Step3Catalog;