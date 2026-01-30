
import React, { useState } from 'react';
import { HERO_SPONGES } from '../constants';

interface Props {
  onBack: () => void;
}

const BuyerDashboard: React.FC<Props> = ({ onBack }) => {
  // Simulator State
  const [selectedProductId, setSelectedProductId] = useState(HERO_SPONGES[0].id);
  const [sellPrice, setSellPrice] = useState(1.95);
  const [monthlyQty, setMonthlyQty] = useState(25000);
  
  // Note: promoImpact removed as requested, keeping variable at 0 for calculations
  const promoImpact = 0;

  const product = HERO_SPONGES.find(p => p.id === selectedProductId) || HERO_SPONGES[0];
  const buyPrice = product.price;
  
  const effectiveSellPrice = sellPrice * (1 - promoImpact / 100);
  const marginRaw = effectiveSellPrice - buyPrice;
  const monthlyMargin = marginRaw * monthlyQty;
  
  const unitsPerShelf = 80;
  const linearRentability = (marginRaw * unitsPerShelf * (monthlyQty / (unitsPerShelf * 10))).toFixed(2);

  return (
    <div className="p-6 md:p-12 animate-fade-in bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-6 md:mb-10 gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-blue-600 font-black text-xs uppercase tracking-[0.4em] mb-2">Espace Décideur</div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-4 leading-none">
              <i className="fas fa-gauge-high text-blue-600"></i>
              Dashboard GMS
            </h1>
          </div>
          <button onClick={onBack} className="bg-white border border-slate-200 text-slate-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3 shadow-sm">
            <i className="fas fa-chevron-left"></i> Retour
          </button>
        </div>

        {/* SECTION A: POURQUOI NOUS RÉFÉRENCER ? (New Design) */}
        <div className="mb-12">
          <div className="bg-white p-10 md:p-14 rounded-[48px] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] text-center md:text-left">
            {/* Titre de section horizontal avec icône ampoule */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-12 border-b border-slate-50 pb-8">
              <div className="w-16 h-16 bg-yellow-400 text-white rounded-[24px] flex items-center justify-center text-3xl shadow-lg shadow-yellow-100">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-widest text-slate-900">
                POURQUOI NOUS RÉFÉRENCER ?
              </h2>
            </div>

            {/* Cartes d'indicateurs (KPI Cards) horizontales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Rotation estimée', value: 'Élevée', icon: 'fa-repeat', pastelBg: 'bg-blue-100 text-blue-600' },
                { label: 'Taux de service', value: '98%', icon: 'fa-truck-fast', pastelBg: 'bg-purple-100 text-purple-600' },
                { label: 'MOQ flexible', value: 'Sur-mesure', icon: 'fa-boxes-packing', pastelBg: 'bg-orange-100 text-orange-600' },
                { label: 'Packaging adaptatif', value: 'Personnalisable', icon: 'fa-puzzle-piece', pastelBg: 'bg-cyan-100 text-cyan-600' }
              ].map((kpi, i) => (
                <div key={i} className="bg-white p-8 rounded-[36px] border border-slate-50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center group">
                  <div className={`w-16 h-16 ${kpi.pastelBg} rounded-full flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform`}>
                    <i className={`fas ${kpi.icon}`}></i>
                  </div>
                  <div className="text-2xl font-black text-slate-900 mb-2 leading-none">{kpi.value}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed px-2">
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <div className="bg-slate-50 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 flex items-center gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Données Industrielles LeaderPak GMS — 2024
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          
          {/* SECTION B: Simulateur orienté VOLUME - With Coming Soon Overlay */}
          <div className="relative">
            {/* Coming Soon Overlay */}
            <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[2px] rounded-[40px] flex items-center justify-center">
              <div className="bg-slate-900 text-white px-10 py-5 rounded-[24px] font-black text-2xl uppercase tracking-[0.3em] shadow-2xl border-4 border-blue-600 animate-pulse">
                Coming Soon
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm grayscale opacity-50">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 text-center md:text-left">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter">
                  <i className="fas fa-calculator text-blue-600"></i>
                  Simulateur de Rentabilité
                </h2>
                <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-bold text-xs uppercase tracking-widest">Projection</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div className="space-y-8 text-center md:text-left flex flex-col items-center md:items-start">
                  <div className="w-full">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Gamme Produit</label>
                    <select 
                      disabled
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold"
                    >
                      {HERO_SPONGES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Prix Vente (TTC)</label>
                      <input 
                        disabled
                        type="number" step="0.01" value={sellPrice}
                        onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                        className="w-full px-6 py-4 bg-white border-2 border-blue-600/20 rounded-2xl font-black text-blue-600 text-xl outline-none text-center md:text-left"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Volume / mois</label>
                      <input 
                        disabled
                        type="number" value={monthlyQty}
                        onChange={(e) => setMonthlyQty(parseInt(e.target.value) || 0)}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none text-center md:text-left"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-8 text-center md:text-left">
                  <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl shadow-slate-200 text-center">
                      <div className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">Vente Nette Unitaire</div>
                      <div className="text-3xl font-black">{effectiveSellPrice.toFixed(2)} <span className="text-sm font-bold text-blue-400">Dh</span></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-slate-100">
                <div className="p-10 rounded-[40px] border-2 flex flex-col items-center text-center transition-all bg-blue-50 border-blue-100">
                  <div className="text-[10px] font-black uppercase tracking-widest mb-2 text-slate-400">Potentiel de Croissance</div>
                  <div className="text-6xl font-black tracking-tighter text-blue-600">Max</div>
                  <div className="text-[10px] font-black mt-4 uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-current opacity-60">
                    Volume Distributeur
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                    <div className="p-8 rounded-[32px] bg-blue-600 text-white shadow-xl shadow-blue-200 flex justify-between items-center text-center md:text-left">
                        <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                            <div className="text-[10px] font-black uppercase opacity-70 mb-1 tracking-widest">Gain Mensuel Projeté</div>
                            <div className="text-3xl font-black tracking-tighter">{monthlyMargin.toLocaleString()} Dh</div>
                        </div>
                        <i className="fas fa-sack-dollar text-4xl opacity-20 hidden md:block"></i>
                    </div>
                    <div className="p-8 rounded-[32px] bg-slate-100 border border-slate-200 flex justify-between items-center text-center md:text-left">
                        <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                            <div className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Rentabilité Linéaire</div>
                            <div className="text-2xl font-black text-slate-900">{linearRentability} Dh <span className="text-sm font-bold opacity-30">/ m</span></div>
                        </div>
                        <i className="fas fa-arrows-left-right text-3xl text-slate-300 hidden md:block"></i>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Dashboard */}
        <div className="mt-20 pt-10 border-t border-slate-200 text-center">
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
            LeaderPak Industrial Intelligence — 2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
