
import React, { useState } from 'react';
import { submitMeetingRequest, submitSampleRequest } from '../supabaseService.ts';

interface Props {
  onPrev: () => void;
  onRestart: () => void;
  onDashboard: () => void;
}

const Step6Conversion: React.FC<Props> = ({ onPrev, onRestart, onDashboard }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSamplePopup, setShowSamplePopup] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('userName') as string;
    const company = formData.get('company') as string;
    const email = formData.get('userEmail') as string;
    const phone = formData.get('userPhone') as string;
    const message = formData.get('message') as string;

    setFormStatus('sending');
    try {
      if (showSamplePopup) {
        const address = formData.get('address') as string;
        await submitSampleRequest({ name, company, email, phone, address, categories: [], message });
      } else {
        const dateTime = formData.get('meetingDateTime') as string;
        await submitMeetingRequest({ name, company, email, phone, meeting_date: dateTime, message });
      }

      setFormStatus('success');
      setTimeout(() => {
          setShowPopup(false);
          setShowSamplePopup(false);
          setFormStatus('idle');
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement de votre demande.");
      setFormStatus('idle');
    }
  };

  return (
    <div className="p-6 md:p-12 animate-fade-in min-h-[80vh] flex flex-col items-center justify-center relative">
      <div className="max-w-5xl w-full text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 animate-float">
            <i className="fas fa-paper-plane text-3xl md:text-4xl"></i>
        </div>
        
        <h2 className="text-2xl md:text-5xl font-extrabold mb-4 md:mb-6">Prêt à booster vos marges ?</h2>
        <p className="text-base md:text-xl text-slate-500 mb-8 md:mb-12 max-w-2xl mx-auto">
            L'excellence opérationnelle LeaderPak est à votre portée. Choisissez l'option qui convient à votre cycle d'achat.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <a href="https://wa.me/212682330820?text=Bonjour%20Younes" target="_blank" className="p-8 bg-green-500 hover:bg-green-600 text-white rounded-[32px] shadow-xl transition-all hover:scale-105 flex flex-col items-center justify-center group">
                <i className="fab fa-whatsapp text-4xl mb-4 group-hover:scale-110 transition-transform"></i>
                <div className="font-bold text-lg">WhatsApp</div>
                <div className="text-[10px] opacity-80 uppercase font-black tracking-widest mt-1">Direct Sourcing</div>
            </a>

            <button onClick={() => setShowPopup(true)} className="p-8 bg-blue-600 hover:bg-blue-700 text-white rounded-[32px] shadow-xl transition-all hover:scale-105 group">
                <i className="fas fa-calendar-check text-4xl mb-4 group-hover:scale-110 transition-transform"></i>
                <div className="font-bold text-lg">Fixer une Rencontre</div>
                <div className="text-[10px] opacity-80 uppercase font-black tracking-widest mt-1">Visite Usine / Locaux</div>
            </button>

            <button onClick={() => setShowSamplePopup(true)} className="p-8 bg-slate-900 hover:bg-slate-800 text-white rounded-[32px] shadow-xl transition-all hover:scale-105 group">
                <i className="fas fa-vial text-4xl mb-4 group-hover:scale-110 transition-transform"></i>
                <div className="font-bold text-lg">Demander des Échantillons</div>
                <div className="text-[10px] opacity-80 uppercase font-black tracking-widest mt-1">Tester la Qualité</div>
            </button>

            <button className="p-8 bg-white border-2 border-slate-100 hover:border-blue-200 rounded-[32px] shadow-sm transition-all hover:scale-105 group">
                <i className="fas fa-file-pdf text-4xl text-blue-600 mb-4 group-hover:scale-110 transition-transform"></i>
                <div className="font-bold text-lg text-slate-900">Catalogue</div>
                <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Offre 2024 (Dh)</div>
            </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-12 pt-10 border-t border-slate-100">
             <button 
                onClick={onDashboard}
                className="group relative px-16 py-6 bg-slate-900 text-white rounded-[24px] font-black text-sm uppercase tracking-[0.3em] flex items-center gap-5 transition-all hover:scale-105 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-blue-600"
             >
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <i className="fas fa-chart-line text-blue-400 group-hover:text-white"></i>
                </div>
                Accéder au Dashboard Acheteur
                <i className="fas fa-arrow-right opacity-50 group-hover:opacity-100 transition-opacity"></i>
             </button>

            <div className="flex gap-10">
                <button onClick={onRestart} className="text-slate-400 hover:text-slate-900 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-colors">
                    <i className="fas fa-redo"></i> Recommencer
                </button>
                <button onClick={onPrev} className="text-slate-400 hover:text-slate-900 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-colors">
                    <i className="fas fa-chevron-left"></i> Retour
                </button>
            </div>
        </div>
      </div>

      {(showPopup || showSamplePopup) && (
        <div className="fixed inset-0 z-[130] bg-slate-900/70 backdrop-blur-md overflow-y-auto flex justify-center md:p-4 md:items-center">
            <div className="bg-white w-full h-full md:h-auto md:max-w-xl md:rounded-[40px] overflow-y-auto shadow-2xl animate-scale-in text-center md:text-left flex flex-col">
                <div className="p-6 md:p-10 flex flex-col flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4 shrink-0">
                        <div className="flex flex-col items-center md:items-start">
                            <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter">
                                {showSamplePopup ? "Demander des Échantillons" : "Fixer une Rencontre"}
                            </h3>
                            <p className="text-slate-500 text-[11px] md:text-sm mt-1">Réponse garantie sous 24h.</p>
                        </div>
                        <button onClick={() => { setShowPopup(false); setShowSamplePopup(false); }} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors shrink-0">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {formStatus === 'success' ? (
                        <div className="py-16 text-center animate-fade-in flex-1 flex flex-col justify-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-check text-2xl md:text-3xl"></i>
                            </div>
                            <h4 className="text-lg md:text-xl font-bold mb-2">Demande enregistrée !</h4>
                            <p className="text-slate-500 text-sm max-w-xs mx-auto">Un responsable va vous contacter.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 flex-1 overflow-y-auto px-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col items-center md:items-start">
                                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1.5">Nom COMPLET</label>
                                    <input required name="userName" type="text" className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-sm text-center md:text-left" />
                                </div>
                                <div className="flex flex-col items-center md:items-start">
                                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1.5">Société</label>
                                    <input required name="company" type="text" className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-sm text-center md:text-left" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex flex-col items-center md:items-start">
                                  <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1.5">EMAIL</label>
                                  <input required name="userEmail" type="email" className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-sm text-center md:text-left" />
                              </div>
                              <div className="flex flex-col items-center md:items-start">
                                  <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1.5">TELEPHONE</label>
                                  <input required name="userPhone" type="tel" className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-sm text-center md:text-left" />
                              </div>
                            </div>
                            
                            {showSamplePopup ? (
                              <div className="flex flex-col items-center md:items-start">
                                  <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1.5">Adresse de livraison</label>
                                  <input required name="address" type="text" className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-sm text-center md:text-left" />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center md:items-start">
                                  <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1.5">DATE & HEURE SOUHAITÉES</label>
                                  <input required name="meetingDateTime" type="datetime-local" className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-sm text-center md:text-left" />
                              </div>
                            )}

                            <div className="flex flex-col items-center md:items-start">
                                <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1.5">Message (Optionnel)</label>
                                <textarea name="message" className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold h-20 md:h-24 resize-none text-sm text-center md:text-left"></textarea>
                            </div>
                            
                            <button 
                                disabled={formStatus === 'sending'}
                                type="submit" 
                                className="w-full py-4 md:py-5 bg-blue-600 text-white rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-xl hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-3 active:scale-95 shrink-0"
                            >
                                {formStatus === 'sending' ? (
                                    <> <i className="fas fa-spinner animate-spin"></i> Traitement... </>
                                ) : 'Envoyer ma demande'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Step6Conversion;
