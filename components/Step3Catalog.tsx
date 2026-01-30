
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  const categories = ['Tous', ...VISION_CATEGORIES.map(c => c.name)];

  const filteredProducts = activeFilter === 'Tous' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <div className="p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 md:mb-8 text-center md:text-left">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Étape 03 — Catalogue</span>
            <h2 className="text-xl md:text-3xl font-bold mt-2">Gamme Complète</h2>
            <p className="text-slate-500 mt-2 text-sm md:text-base">Diversifiez votre offre avec nos produits essentiels certifiés.</p>
        </div>

        {/* Barre de Filtres - VERSION DESKTOP */}
        <div className="hidden md:flex flex-wrap gap-2 mb-12 bg-slate-50 p-2 rounded-2xl border border-slate-100">
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

        {/* Barre de Filtres - VERSION MOBILE */}
        <div className="flex flex-col md:hidden mb-10 gap-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-[24px] px-6 py-4 font-bold text-slate-700 shadow-sm active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <i className="fas fa-filter text-blue-600 text-xs"></i>
              <span>{activeFilter === 'Tous' ? 'Toutes les catégories' : activeFilter}</span>
            </div>
            <i className={`fas fa-chevron-down text-blue-600 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}></i>
          </button>

          {isMenuOpen && (
            <div className="flex flex-col gap-2 bg-slate-50/50 p-2 rounded-[24px] border border-slate-100 animate-slide-up">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveFilter(cat);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-6 py-4 rounded-[18px] text-sm font-bold transition-all ${
                    activeFilter === cat 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  {cat === 'Tous' ? 'Toutes les catégories' : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredProducts.map((product) => (
                  <div 
                      key={product.id}
                      className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-center md:text-left flex flex-col"
                  >
                      <div className="relative h-48 overflow-hidden">
                          <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-blue-600 shadow-sm uppercase tracking-widest">
                                  {product.category}
                              </span>
                          </div>
                      </div>
                      <div className="p-6 flex flex-col items-center md:items-start flex-1">
                          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                          <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
                              {product.description}
                          </p>
                          
                          <div className="flex items-center justify-center w-full mb-6 pt-4 border-t border-slate-50">
                              <div className="text-center">
                                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Rotation</div>
                                  <div className="text-slate-900 font-bold">{product.rotation}</div>
                              </div>
                          </div>

                          <button 
                              onClick={() => setSelectedProduct(product)}
                              className="w-full py-3 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
                          >
                              Fiche Technique
                              <i className="fas fa-expand text-[10px]"></i>
                          </button>
                      </div>
                  </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 mb-16">
              <i className="fas fa-search text-slate-300 text-4xl mb-4"></i>
              <div className="text-slate-500 font-bold">Aucun produit trouvé dans cette catégorie.</div>
          </div>
        )}

        {/* Section Nouveautés à venir */}
        <div className="mb-20">
          <div className="relative bg-slate-900 rounded-[40px] p-8 md:p-16 overflow-hidden group">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/20 blur-[100px] rounded-full group-hover:bg-blue-600/30 transition-all duration-1000"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-[20px] border-white/5 rounded-full"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1 text-center lg:text-left">
                <span className="inline-block bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-6 animate-pulse">
                  Innovation Continue
                </span>
                <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
                  D'autres catalogues <br /> <span className="text-blue-500">arrivent bientôt...</span>
                </h3>
                <p className="text-slate-400 text-sm md:text-lg max-w-xl leading-relaxed">
                  Notre département R&D finalise actuellement de nouvelles gammes pour le nettoyage industriel, l'hygiène domestique et des solutions plastiques intelligentes. Restez connectés pour nos prochaines releases.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 lg:w-[400px]">
                {[
                  { label: 'Hygiène', icon: 'fa-hands-bubbles' },
                  { label: 'Ménage', icon: 'fa-broom' },
                  { label: 'Cuisine', icon: 'fa-utensils' },
                  { label: 'Accessoires', icon: 'fa-screwdriver-wrench' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-3xl flex flex-col items-center justify-center gap-3 w-[140px] md:w-[170px] hover:bg-white/10 hover:border-blue-500/50 transition-all">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center">
                      <i className={`fas ${item.icon} text-lg md:text-xl`}></i>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest text-center">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MODALE FICHE TECHNIQUE PLEIN ECRAN MOBILE AVEC TEXTE REDUIT */}
        {selectedProduct && (
            <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl overflow-y-auto flex justify-center md:p-4 md:items-center">
                <div className="bg-white w-full h-full md:h-auto md:max-w-3xl md:rounded-[40px] overflow-y-auto shadow-[0_0_100px_rgba(0,0,0,0.4)] animate-scale-in p-6 md:p-12 flex flex-col">
                    
                    <div className="flex justify-between items-start mb-6 md:mb-8 shrink-0">
                        <div className="pr-10">
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-blue-600 block mb-1 md:mb-2">Fiche Technique</span>
                            <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">{selectedProduct.name}</h3>
                        </div>
                        <button onClick={() => setSelectedProduct(null)} className="w-10 h-10 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-all shrink-0">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="mb-6 md:mb-8">
                        <h4 className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 md:mb-4">Description</h4>
                        <p className="text-slate-600 text-sm md:text-lg leading-relaxed font-medium">
                            {selectedProduct.description}
                        </p>
                    </div>

                    <div className="flex justify-center mb-6 md:mb-8">
                        <div className="p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border border-slate-100 text-center w-full max-w-xs">
                            <div className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Rotation Rayon</div>
                            <div className="text-lg md:text-2xl font-black text-blue-600">{selectedProduct.rotation}</div>
                        </div>
                    </div>

                    <div className="space-y-4 md:space-y-6 mb-10 flex-1">
                        <h4 className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100 pb-2">Points Clés</h4>
                        <div className="grid grid-cols-1 gap-2 md:gap-3">
                            {selectedProduct.highlights.map((h, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs md:text-sm font-bold text-slate-700 bg-white p-3 md:p-4 rounded-xl border border-slate-50 shadow-sm">
                                    <i className="fas fa-check-circle text-blue-600 text-base md:text-lg"></i>
                                    {h}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-6 border-t border-slate-100 shrink-0">
                        <button 
                            onClick={() => setSelectedProduct(null)}
                            className="w-full py-4 md:py-5 bg-slate-900 text-white rounded-xl md:rounded-2xl font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                        >
                            Fermer
                        </button>
                        <button 
                            onClick={onNext}
                            className="w-full py-4 md:py-5 bg-blue-600 text-white rounded-xl md:rounded-2xl font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                        >
                            <i className="fas fa-calculator"></i> Simuler Prix
                        </button>
                    </div>
                </div>
            </div>
        )}

        <div className="flex justify-between items-center pt-8 border-t border-slate-100">
            <button onClick={onPrev} className="text-slate-500 font-bold px-6 py-3 uppercase text-xs tracking-widest">
                <i className="fas fa-chevron-left mr-2"></i> Retour
            </button>
            <button onClick={onNext} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-3 uppercase text-xs tracking-widest">
                Calculer un Devis
                <i className="fas fa-arrow-right"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Step3Catalog;
