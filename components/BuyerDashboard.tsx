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
  const [promoImpact, setPromoImpact] = useState(0);

  const product = HERO_SPONGES.find(p => p.id === selectedProductId) || HERO_SPONGES[0];
  const buyPrice = product.price;
  
  const effectiveSellPrice = sellPrice * (1 - promoImpact / 100);
  const marginRaw = effectiveSellPrice - buyPrice;
  const marginPercent = (marginRaw / effectiveSellPrice) * 100;
  const monthlyCA = effectiveSellPrice * monthlyQty;
  const monthlyMargin = marginRaw * monthlyQty;
  
  const unitsPerShelf = 80;
  const linearRentability = (marginRaw * unitsPerShelf * (monthlyQty / (unitsPerShelf * 10))).toFixed(2);

  const getMarginColor = (percent: number) => {
    if (percent >= 35) return 'text-green-500 bg-green-50 border-green-200';
    if (percent >= 20) return 'text-orange-500 bg-orange-50 border-orange-200';
    return 'text-red-500 bg-red-50 border-red-200';
  };

  const [packagingConfig, setPackagingConfig] = useState({
    format: '20g',
    dimensions: 'Standard (8x5x3cm)',
    unitsPerBox: '240',
    brand: 'Marque Distributeur (MDD)',
    labeling: 'Français/Arabe'
  });

  return (
    <div className="p-6 md:p-12 animate-fade-in bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
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
          <div className="bg-white p-10 md:p-14 rounded-[48px] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)]">
            {/* Titre de section horizontal avec icône ampoule */}
            <div className="flex items-center gap-6 mb-12 border-b border-slate-50 pb-8">
              <div className="w-16 h-16 bg-yellow-400 text-white rounded-[24px] flex items-center justify-center text-3xl shadow-lg shadow-yellow-100">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-widest text-slate-900">
                POURQUOI NOUS RÉFÉRENCER ?
              </h2>
            </div>

            {/* Cartes d'indicateurs (KPI Cards) horizontales */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { label: 'Marge brute cible GMS', value: '35% – 48%', icon: 'fa-coins', pastelBg: 'bg-green-100 text-green-600' },
                { label: 'Rotation estimée', value: 'Élevé', icon: 'fa-repeat', pastelBg: 'bg-blue-100 text-blue-600' },
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* SECTION B: Simulateur orienté MARGE */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter">
                  <i className="fas fa-calculator text-blue-600"></i>
                  Simulateur de Marge
                </h2>
                <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-bold text-xs uppercase tracking-widest">Temps Réel</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Gamme Produit</label>
                    <select 
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 font-bold"
                    >
                      {HERO_SPONGES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Prix Vente (TTC)</label>
                      <input 
                        type="number" step="0.01" value={sellPrice}
                        onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                        className="w-full px-6 py-4 bg-white border-2 border-blue-600/20 rounded-2xl font-black text-blue-600 text-xl outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Volume / mois</label>
                      <input 
                        type="number" value={monthlyQty}
                        onChange={(e) => setMonthlyQty(parseInt(e.target.value) || 0)}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Impact Promotionnel (%)</label>
                    <input 
                      type="range" min="0" max="50" step="5" value={promoImpact}
                      onChange={(e) => setPromoImpact(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>Plein tarif</span>
                        <span className="text-blue-600">Promo: -{promoImpact}%</span>
                        <span>Max -50%</span>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl shadow-slate-200">
                      <div className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">Vente Nette Unitaire</div>
                      <div className="text-3xl font-black">{effectiveSellPrice.toFixed(2)} <span className="text-sm font-bold text-blue-400">Dh</span></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-slate-100">
                <div className={`p-10 rounded-[40px] border-2 flex flex-col items-center text-center transition-all ${getMarginColor(marginPercent)}`}>
                  <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">Rendement Marge</div>
                  <div className="text-6xl font-black tracking-tighter">{marginPercent.toFixed(1)}%</div>
                  <div className="text-[10px] font-black mt-4 uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-current opacity-60">
                    {marginPercent >= 35 ? 'Marge Optimale' : marginPercent >= 20 ? 'Marge Standard' : 'Marge Critique'}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                    <div className="p-8 rounded-[32px] bg-blue-600 text-white shadow-xl shadow-blue-200 flex justify-between items-center">
                        <div>
                            <div className="text-[10px] font-black uppercase opacity-70 mb-1 tracking-widest">Marge Mensuelle</div>
                            <div className="text-3xl font-black tracking-tighter">{monthlyMargin.toLocaleString()} Dh</div>
                        </div>
                        <i className="fas fa-sack-dollar text-4xl opacity-20"></i>
                    </div>
                    <div className="p-8 rounded-[32px] bg-slate-100 border border-slate-200 flex justify-between items-center">
                        <div>
                            <div className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Rentabilité Linéaire</div>
                            <div className="text-2xl font-black text-slate-900">{linearRentability} Dh <span className="text-sm font-bold opacity-30">/ m</span></div>
                        </div>
                        <i className="fas fa-arrows-left-right text-3xl text-slate-300"></i>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C: Personnalisation du packaging */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl sticky top-24 overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl rotate-45"><i className="fas fa-box-open"></i></div>
              
              <h2 className="text-2xl font-black mb-10 flex items-center gap-4 uppercase tracking-tighter relative z-10">
                <i className="fas fa-layer-group text-blue-400"></i>
                Personnalisation
              </h2>
              
              <div className="space-y-8 relative z-10">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Format & Contenance</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['15g', '20g', '25g', '40g'].map(f => (
                            <button 
                                key={f} onClick={() => setPackagingConfig(p => ({...p, format: f}))}
                                className={`py-3 rounded-xl text-xs font-bold transition-all border ${packagingConfig.format === f ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'border-white/10 text-slate-400 hover:bg-white/5'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Dimensions Unité</label>
                    <input 
                      type="text" value={packagingConfig.dimensions}
                      onChange={(e) => setPackagingConfig(p => ({...p, dimensions: e.target.value}))}
                      className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Unités par Carton</label>
                    <select 
                      value={packagingConfig.unitsPerBox}
                      onChange={(e) => setPackagingConfig(p => ({...p, unitsPerBox: e.target.value}))}
                      className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold outline-none"
                    >
                        <option value="48">48 unités</option>
                        <option value="120">120 unités</option>
                        <option value="240">240 unités</option>
                        <option value="480">480 unités</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Option Marque</label>
                    <div className="grid grid-cols-1 gap-2">
                        {['Marque LeaderPak', 'Marque Distributeur (MDD)'].map(m => (
                            <button 
                                key={m} onClick={() => setPackagingConfig(p => ({...p, brand: m}))}
                                className={`px-5 py-4 rounded-xl text-xs font-bold text-left transition-all border ${packagingConfig.brand === m ? 'bg-white text-slate-900 shadow-xl' : 'border-white/10 text-slate-400 hover:bg-white/5'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-blue-600 rounded-[32px] shadow-xl">
                    <p className="text-sm font-medium leading-relaxed italic opacity-90">
                        “Nous adaptons le packaging aux contraintes de votre rayon et à vos objectifs de rotation.”
                    </p>
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