
import React, { useState } from 'react';
import { submitPriceGridRequest } from '../supabaseService.ts';

interface Props {
  onBack: () => void;
  onSample: () => void;
}

const QuickPriceAccess: React.FC<Props> = ({ onBack, onSample }) => {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('userName') as string;
    const email = formData.get('userEmail') as string;
    const categories: string[] = [];
    formData.getAll('categories').forEach(cat => categories.push(cat as string));

    setIsSubmitting(true);
    try {
      await submitPriceGridRequest({ name, email, categories });
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onBack();
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi de votre demande.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="bg-white w-full max-w-6xl rounded-[48px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col lg:flex-row min-h-[750px]">
        
        {/* SECTION FORMULAIRE (50%) */}
        <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white text-center md:text-left">
          <div className="mb-12 flex flex-col items-center md:items-start">
            <button onClick={onBack} className="text-slate-400 hover:text-slate-900 mb-8 flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-colors">
              <i className="fas fa-arrow-left"></i> Retour
            </button>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-tight">
              Demande de <br /><span className="text-blue-600 text-5xl">Grille Tarifaire</span>
            </h3>
            <p className="text-slate-500 text-lg mt-4 max-w-sm mx-auto md:mx-0">Détail complet de nos prix industriels et conditions logistiques.</p>
          </div>

          {sent ? (
            <div className="py-20 animate-scale-in text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 mx-auto">
                <i className="fas fa-check text-3xl"></i>
              </div>
              <h4 className="text-2xl font-black mb-4 uppercase">Demande Reçue</h4>
              <p className="text-slate-500">M. Younes OUAKRIM reviendra vers vous par email sous 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 text-left">
              <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 text-center md:text-left">Catégories stratégiques</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Éponges Inox", "Plastiques HD", "Alu / Film Pro", "Hygiène Sol"].map(cat => (
                    <label key={cat} className="flex items-center gap-3 text-sm font-bold text-slate-700 cursor-pointer group">
                      <input type="checkbox" name="categories" value={cat} className="w-5 h-5 accent-blue-600 rounded-lg border-slate-200" /> 
                      <span className="group-hover:text-blue-600 transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="userName" type="text" placeholder="Nom Complet" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 font-bold transition-all text-center md:text-left" />
                <input required name="userEmail" type="email" placeholder="Email Pro" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 font-bold transition-all text-center md:text-left" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-blue-600 text-white rounded-[20px] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-blue-900/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-4">
                {isSubmitting ? "Envoi..." : "Recevoir la Grille"}
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          )}
        </div>

        {/* SECTION COMMERCIAL (50%) - DESIGN AMÉLIORÉ */}
        <div className="lg:w-1/2 bg-blue-600 relative overflow-hidden flex flex-col text-white">
          {/* Motif de fond décoratif */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 border-[40px] border-white rounded-full"></div>
            <div className="absolute bottom-20 left-10 w-48 h-48 bg-white rounded-full"></div>
          </div>

          <div className="flex-1 flex flex-col p-12 md:p-20 relative z-10 justify-center">
            <div className="mb-12 text-center md:text-left flex flex-col items-center md:items-start">
              <div className="w-16 h-1 bg-white/30 rounded-full mb-8"></div>
              <h4 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">Service Client</h4>
              <p className="text-blue-100 font-medium opacity-80 uppercase text-[10px] tracking-[0.4em]">Expertise & Proximité</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative mb-10 group">
                <div className="absolute inset-0 bg-white/20 rounded-[40px] rotate-6 group-hover:rotate-3 transition-transform"></div>
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" 
                  alt="Younes OUAKRIM" 
                  className="relative w-52 h-64 object-cover rounded-[40px] shadow-2xl grayscale transition-all duration-700 group-hover:grayscale-0 border-4 border-white/20" 
                />
                <div className="absolute -bottom-4 -right-4 bg-white text-blue-600 w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
                  <i className="fas fa-comment-dots text-2xl"></i>
                </div>
              </div>

              <div className="text-center mb-12">
                <h5 className="text-3xl font-black uppercase tracking-tighter leading-none">M. Younes OUAKRIM</h5>
                <div className="text-blue-100 font-bold uppercase text-[10px] tracking-[0.3em] mt-3 opacity-80">Responsable des Comptes Clés</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[40px] text-center relative max-w-sm mb-12">
                <i className="fas fa-quote-left absolute -top-5 left-8 text-white/30 text-5xl"></i>
                <p className="text-xl italic font-medium leading-relaxed">
                  "Notre priorité est de vous offrir la meilleure qualité au meilleur prix pour garantir votre succès en rayon."
                </p>
              </div>

              <button 
                onClick={onSample} 
                className="w-full max-w-sm bg-white text-blue-600 py-6 rounded-3xl font-black text-xs uppercase tracking-widest transition-all hover:bg-blue-50 active:scale-95 shadow-2xl flex items-center justify-center gap-4 group"
              >
                <i className="fas fa-flask text-xl group-hover:rotate-12 transition-transform"></i>
                Recevoir un Échantillon Gratuit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPriceAccess;
