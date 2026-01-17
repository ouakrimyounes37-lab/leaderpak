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

  // Sync with initialFilter from props (navigation from Step 1)
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
        <div className="mb-8">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-[10px]">Étape 03 — Catalogue</span>
            <h2 className="text-xl font-bold mt-2">Gamme Complète</h2>
            <p className="text-slate-500 mt-2 text-sm">Diversifiez votre offre avec nos produits essentiels certifiés.</p>
        </div>

        {/* Barre de Filtres */}
        <div className="flex flex-wrap gap-2 mb-12 bg-slate-50 p-2 rounded-2xl border border-slate-100">
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

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredProducts.map((product) => (
                  <div 
                      key={product.id}
                      className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
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
                      <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                          <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                              {product.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-6 pt-4 border-t border-slate-50">
                              <div>
                                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Marge Distr.</div>
                                  <div className="text-green-600 font-bold">{product.margin}</div>
                              </div>
                              <div className="text-right">
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

        <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden mb-16">
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                    <div className="inline-block px-3 py-1 bg-blue-600 rounded-lg text-[10px] font-bold uppercase mb-4 tracking-widest">Cross-Sell Stratégique</div>
                    <h3 className="text-3xl font-bold mb-4">Optimisez vos conteneurs</h3>
                    <p className="text-slate-400 leading-relaxed mb-6">
                        Mixer nos catégories (Éponges + Plastiques + Alu) permet d'amortir vos frais de transport et de bénéficier de remises de volume cumulées.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-900 overflow-hidden">
                                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Buyer" />
                              </div>
                            ))}
                        </div>
                        <span className="text-sm text-slate-400">Plus de 150 enseignes nous font confiance</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm group hover:bg-white/10 transition-all">
                        <div className="text-3xl font-bold mb-1 text-blue-400">15%</div>
                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Gain Logistique</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm group hover:bg-white/10 transition-all">
                        <div className="text-3xl font-bold mb-1 text-blue-400">1 SKC</div>
                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Stock Consolidé</div>
                    </div>
                </div>
             </div>
        </div>

        {selectedProduct && (
            <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
                    <div className="p-8 flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2">
                            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full rounded-2xl shadow-lg" />
                        </div>
                        <div className="md:w-1/2">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                                <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-slate-900">
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>
                            <p className="text-slate-500 mb-6">{selectedProduct.description}</p>
                            <div className="space-y-3 mb-8">
                                {selectedProduct.highlights.map((h, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                                        <i className="fas fa-circle-check text-blue-500"></i>
                                        {h}
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={() => setSelectedProduct(null)}
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <div className="flex justify-between items-center pt-8 border-t border-slate-100">
            <button onClick={onPrev} className="text-slate-500 hover:text-slate-900 font-semibold px-6 py-3">
                <i className="fas fa-chevron-left mr-2"></i> Retour
            </button>
            <button onClick={onNext} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-3">
                Calculer un Devis
                <i className="fas fa-arrow-right"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Step3Catalog;