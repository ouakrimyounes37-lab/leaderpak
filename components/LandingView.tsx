import React from 'react';
import { OUR_BRANDS } from '../constants';

interface Props {
  onStart: () => void;
  onExplore: () => void;
  onQuickPrices: () => void;
  onDashboard: () => void;
}

const LandingView: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 relative overflow-hidden px-4">
      {/* Elements de fond */}
      <div className="absolute top-20 left-20 text-blue-500/10 text-9xl animate-float">
        <i className="fas fa-globe-africa"></i>
      </div>
      <div className="absolute bottom-20 right-20 text-cyan-500/10 text-9xl animate-float-delayed">
        <i className="fas fa-industry"></i>
      </div>
      
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-600/10 blur-[120px] rounded-full"></div>
      
      <div className="max-w-4xl text-center z-10 animate-fade-in-up mt-12 mb-20">
        {/* Logo Container */}
        <div className="mb-12 flex flex-col items-center">
            <div className="w-28 h-28 bg-blue-600 rounded-[32px] flex items-center justify-center shadow-[0_20px_50px_rgba(37,99,235,0.3)] mb-6 animate-float">
              <i className="fas fa-globe-americas text-white text-5xl"></i>
            </div>
            <div className="text-white">
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-1">LEADER PAK</h2>
                <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mb-2"></div>
                <div className="text-blue-400 font-bold tracking-[0.4em] uppercase text-xs">Sourcing & Production Industriel</div>
            </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Votre partenaire global pour les <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">produits ménagers de haute performance.</span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Savoir-faire historique depuis 2013. Nous accompagnons les leaders de la distribution avec des solutions de sourcing sur-mesure et une qualité industrielle garantie.
        </p>
        
        <div className="flex flex-col items-center gap-8 mb-16">
          <button 
            onClick={onStart}
            className="group relative w-full sm:w-auto px-20 py-8 bg-blue-600 text-white rounded-[32px] font-black text-2xl uppercase tracking-[0.2em] shadow-[0_20px_80px_rgba(37,99,235,0.5),0_0_0_10px_rgba(37,99,235,0.1)] hover:shadow-[0_30px_100px_rgba(37,99,235,0.6),0_0_0_15px_rgba(37,99,235,0.15)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-6 overflow-hidden"
          >
            <span className="relative z-10">Démarrer le Parcours</span>
            <i className="fas fa-chevron-right relative z-10 group-hover:translate-x-3 transition-transform duration-300"></i>
            
            {/* Effet de brillance animé */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            
            {/* Glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity"></div>
          </button>
        </div>
      </div>

      {/* Marquee des Marques */}
      <div className="w-full bg-slate-800/50 backdrop-blur-sm border-y border-white/5 py-10 overflow-hidden relative z-20">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
        
        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
            {[...OUR_BRANDS, ...OUR_BRANDS].map((brand, i) => (
                <div key={i} className="flex items-center gap-3 group">
                    <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${brand.color} group-hover:bg-white/10 transition-colors`}>
                        <i className={`fas ${brand.icon} text-xl`}></i>
                    </div>
                    <span className="text-slate-400 font-black text-sm uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                        {brand.name}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LandingView;