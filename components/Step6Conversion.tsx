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
    const message = formData.get('message') as string;

    setFormStatus('sending');
    try {
      if (showSamplePopup) {
        const address = formData.get('address') as string;
        const categories: string[] = [];
        formData.getAll('categories').forEach(cat => categories.push(cat as string));
        await submitSampleRequest({ name, company, email, address, categories, message });
      } else {
        const location = formData.get('meeting') as string;
        await submitMeetingRequest({ name, company, email, location, message });
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
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-float">
            <i className="fas fa-paper-plane text-4xl"></i>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Prêt à booster vos marges ?</h2>
        <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
            L'excellence opérationnelle LeaderPak est à votre portée. Choisissez l'option qui convient à votre cycle d'achat.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <a href="https://wa.me/212600000000" target="_blank" className="p-8 bg-green-500 hover:bg-green-600 text-white rounded-[32px] shadow-xl transition-all hover:scale-105 flex flex-col items-center justify-center group">
                <i className="fab fa-whatsapp text-4xl mb-4 group-hover:scale-110 transition-transform"></i>
                <div className="font-bold text-lg">WhatsApp</div>
                <div className="text-[10px] opacity-80 uppercase font-black tracking-widest mt-1">Direct Sourcing</div>
            </a>

            <button onClick={() => setShowPopup(true)} className="p-8 bg-blue-600 hover:bg-blue-700 text-white rounded-[32px] shadow-xl transition-all hover:scale-105 group">
                <i className="fas fa-calendar-check text-4xl mb-4 group-hover:scale-110 transition-transform"></i>
                <div className="font-bold text-lg">Prendre RDV</div>
                <div className="text-[10px] opacity-80 uppercase font-black tracking-widest mt-1">Visite Usine / Locaux</div>
            </button>

            <button onClick={() => setShowSamplePopup(true)} className="p-8 bg-slate-900 hover:bg-slate-800 text-white rounded-[32px] shadow-xl transition-all hover:scale-105 group">
                <i className="fas fa-vial text-4xl mb-4 group-hover:scale-110 transition-transform"></i>
                <div className="font-bold text-lg">Échantillons</div>
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

      {/* MODALE DE CONTACT / ÉCHANTILLON */}
      {(showPopup || showSamplePopup) && (
        <div className="fixed inset-0 z-[130] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-[40px] overflow-hidden shadow-2xl animate-scale-in">
                <div className="p-10">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                                {showSamplePopup ? "Demander des Échantillons" : "Fixer une Rencontre"}
                            </h3>
                            <p className="text-slate-500 text-sm mt-1">Réponse de notre équipe sous 24h ouvrées.</p>
                        </div>
                        <button onClick={() => { setShowPopup(false); setShowSamplePopup(false); }} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {formStatus === 'success' ? (
                        <div className="py-16 text-center animate-fade-in">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-check text-3xl"></i>
                            </div>
                            <h4 className="text-xl font-bold mb-2">Demande enregistrée !</h4>
                            <p className="text-slate-500 max-w-xs mx-auto">Un responsable LeaderPak va vous contacter personnellement.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Nom & Prénom</label>
                                    <input required name="userName" type="text" placeholder="Khalid Alami" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Société</label>
                                    <input required name="company" type="text" placeholder="SARL / SA / Groupe" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Email Professionnel</label>
                                <input required name="userEmail" type="email" placeholder="k.alami@groupe.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold" />
                            </div>
                            
                            {showSamplePopup ? (
                              <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Adresse de livraison (Échantillons)</label>
                                    <input required name="address" type="text" placeholder="Rue, Ville, Code Postal" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold" />
                                </div>
                                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Gammes à tester</label>
                                  <div className="grid grid-cols-2 gap-3">
                                    {["Éponges Pro-Shine", "Produits Plastiques", "Alum/Film Food", "Savon/Hygiène"].map(g => (
                                      <label key={g} className="flex items-center gap-3 text-sm font-bold text-slate-700 cursor-pointer group">
                                        <input type="checkbox" name="categories" value={g} className="w-5 h-5 accent-blue-600 rounded border-slate-300" /> 
                                        <span className="group-hover:text-blue-600 transition-colors">{g}</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                                  <label className="block text-[10px] font-black text-blue-700 uppercase tracking-widest mb-3">Lieu souhaité de rencontre</label>
                                  <div className="flex gap-6">
                                      <label className="flex items-center gap-2 cursor-pointer group">
                                          <input type="radio" name="meeting" value="Bureaux LeaderPak (CASA)" defaultChecked className="w-4 h-4 accent-blue-600" />
                                          <span className="text-sm font-bold text-blue-900 group-hover:text-blue-700">Nos Bureaux (CASA)</span>
                                      </label>
                                      <label className="flex items-center gap-2 cursor-pointer group">
                                          <input type="radio" name="meeting" value="Locaux Client" className="w-4 h-4 accent-blue-600" />
                                          <span className="text-sm font-bold text-blue-900 group-hover:text-blue-700">Vos Locaux</span>
                                      </label>
                                  </div>
                              </div>
                            )}

                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Précisions ou Message</label>
                                <textarea name="message" placeholder="Décrivez vos besoins volumétriques..." className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold h-24 resize-none"></textarea>
                            </div>
                            
                            <button 
                                disabled={formStatus === 'sending'}
                                type="submit" 
                                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                {formStatus === 'sending' ? (
                                    <> <i className="fas fa-spinner animate-spin"></i> Traitement... </>
                                ) : 'Envoyer ma demande officielle'}
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