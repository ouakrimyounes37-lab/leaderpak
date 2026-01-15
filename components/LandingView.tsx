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
      
      <div className="max-w-5xl text-center z-10 animate-fade-in-up mt-4 mb-8">
        {/* Logo Container - Taille réduite */}
        <div className="mb-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-600 rounded-[24px] flex items-center justify-center shadow-[0_20px_50px_rgba(37,99,235,0.3)] mb-4 animate-float">
              <i className="fas fa-globe-americas text-white text-4xl"></i>
            </div>
            <div className="text-white">
                <h2 className="text-4xl font-black tracking-tighter mb-0.5">LEADER PAK</h2>
                <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mb-1"></div>
                <div className="text-blue-400 font-bold tracking-[0.4em] uppercase text-[10px]">Sourcing & Production Industriel</div>
            </div>
        </div>
        
        {/* Headline - Taille de police réduite et margin réduit */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
          La référence en produits ménagers <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">de haute performance</span>
        </h1>
        
        {/* Paragraph - Taille de police réduite et margin réduit */}
        <p className="text-lg text-slate-400 mb-6 max-w-3xl mx-auto leading-relaxed">
          Solutions sur-mesure et qualité industrielle pour les leaders de la distribution.
        </p>
        
        <div className="flex flex-col items-center gap-6 mb-8">
          <button 
            onClick={onStart}
            className="group relative w-full sm:w-auto px-16 py-6 bg-blue-600 text-white rounded-[24px] font-black text-xl uppercase tracking-[0.2em] shadow-[0_20px_80px_rgba(37,99,235,0.5),0_0_0_10px_rgba(37,99,235,0.1)] hover:shadow-[0_30px_100px_rgba(37,99,235,0.6),0_0_0_15px_rgba(37,99,235,0.15)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4 overflow-hidden"
          >
            <span className="relative z-10">Commencer l’expérience</span>
            <i className="fas fa-chevron-right relative z-10 group-hover:translate-x-2 transition-transform duration-300"></i>
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity"></div>
          </button>
        </div>
      </div>

      {/* Marquee des Marques */}
      <div className="w-full bg-slate-800/50 backdrop-blur-sm border-y border-white/5 py-8 overflow-hidden relative z-20">
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