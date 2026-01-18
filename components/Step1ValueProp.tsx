
import React from 'react';
import { COMPANY_STATS, VISION_CATEGORIES, OUR_BRANDS } from '../constants';

interface Props {
  onNext: () => void;
  onPrev: () => void;
  onCategorySelect: (category: string) => void;
}

const Step1ValueProp: React.FC<Props> = ({ onNext, onPrev, onCategorySelect }) => {
  return (
    <div className="p-6 md:p-12 animate-slide-up">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Étape 01 — Vision LeaderPak</span>
            <h2 className="text-xl md:text-3xl font-bold mt-2 text-slate-900">Expertise Industrielle Diversifiée</h2>
            <p className="text-slate-500 mt-4 text-sm md:text-base max-w-3xl">
                Producteur et importateur de référence depuis 2013, nous articulons notre savoir-faire autour de 4 piliers stratégiques.
            </p>
        </div>

        {/* 1. Grille des Catégories de Vision */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            {VISION_CATEGORIES.map((cat) => (
                <div 
                    key={cat.id} 
                    className={`group relative bg-white border rounded-[32px] p-1 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${
                      cat.isHighlight ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-100'
                    }`}
                >
                    {cat.isHighlight && (
                        <div className="absolute top-4 right-4 z-10">
                            <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                Expertise Historique
                            </span>
                        </div>
                    )}
                    <div className="flex flex-col md:flex-row h-full">
                        <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="p-8 md:w-3/5 flex flex-col justify-center">
                            {/* Layout Icon + Titre: Row sur mobile, Stack sur desktop */}
                            <div className="flex items-center gap-4 md:block mb-4 md:mb-0">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 md:mb-4 ${cat.isHighlight ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-blue-50 text-blue-600'}`}>
                                    <i className={`fas ${cat.icon} text-xl`}></i>
                                </div>
                                <h3 className={`text-lg md:text-xl font-bold md:mb-2 ${cat.isHighlight ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'} transition-colors`}>
                                    {cat.name}
                                </h3>
                            </div>
                            
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                {cat.description}
                            </p>
                            <button 
                                onClick={() => onCategorySelect(cat.name)}
                                className={`mt-auto flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all ${
                                    cat.isHighlight 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white'
                                }`}
                            >
                                Découvrir les produits
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* 2. Grille des Engagements (Stats) - Remontée ici */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {COMPANY_STATS.map((stat, i) => (
                <div key={i} className="text-center p-8 bg-slate-50 border border-slate-100 rounded-3xl group hover:bg-white hover:shadow-lg transition-all">
                    <i className={`fas ${stat.icon} text-2xl text-blue-600 mb-4 group-hover:scale-110 transition-transform`}></i>
                    <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
            ))}
        </div>

        {/* 3. Section Nos Marques - Version Marquee (Placée après les engagements) */}
        <div className="mb-20">
            <div className="w-full bg-white border border-slate-100 rounded-[32px] py-10 overflow-hidden relative group cursor-default">
                {/* Gradients pour cacher les bords */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
                
                <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
                    {/* Doublement pour effet infini */}
                    {[...OUR_BRANDS, ...OUR_BRANDS].map((brand, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 px-4 group/item">
                            <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover/item:bg-blue-50 group-hover/item:text-blue-600 transition-all duration-300 shadow-sm group-hover/item:shadow-lg group-hover/item:scale-110`}>
                                <i className={`fas ${brand.icon} text-xl`}></i>
                            </div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover/item:text-slate-900 transition-colors">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-slate-100">
            <button onClick={onPrev} className="text-slate-400 hover:text-slate-900 font-semibold px-6 py-3 transition-colors">
                <i className="fas fa-chevron-left mr-2"></i> Retour
            </button>
            <button onClick={onNext} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-3 shadow-xl hover:shadow-2xl active:scale-95">
                Prochaine Étape
                <i className="fas fa-arrow-right"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Step1ValueProp;
