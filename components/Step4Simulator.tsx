import React, { useState, useRef } from 'react';
import { HERO_SPONGES } from '../constants';
import { submitPriceGridRequest } from '../supabaseService.ts';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const Step4Simulator: React.FC<Props> = ({ onNext, onPrev }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    HERO_SPONGES.reduce((acc: Record<string, number>, s: any) => ({ ...acc, [s.id]: 0 }), {})
  );
  const [companyName, setCompanyName] = useState('');
  const [showNameError, setShowNameError] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isEmailing, setIsEmailing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showFullPriceModal, setShowFullPriceModal] = useState(false);
  const [fullPriceFormSent, setFullPriceFormSent] = useState(false);

  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  const updateQty = (id: string, val: string) => {
    const n = Math.max(0, parseInt(val) || 0);
    setQuantities(prev => ({ ...prev, [id]: n }));
  };

  const totalTTC = HERO_SPONGES.reduce((sum: number, s: any) => sum + (quantities[s.id] * s.price), 0);
  const totalHT = totalTTC / 1.2;
  const tvaVal = totalTTC - totalHT;
  const totalQty = Object.values(quantities).reduce((a: number, b: number) => (a as number) + (b as number), 0);
  const quoteDate = new Date().toLocaleDateString('fr-FR');
  const quoteNumber = `LP-${Math.floor(Date.now() / 100000)}`;

  const handleExportPDF = () => {
    if (!companyName.trim()) {
      setShowNameError(true);
      return;
    }
    setShowNameError(false);
    
    if (totalQty === 0) {
      alert("Le devis est vide. Veuillez ajouter des produits.");
      return;
    }
    setShowPreviewModal(true);
  };

  const handleOpenEmailModal = () => {
    if (!companyName.trim()) {
      setShowNameError(true);
      return;
    }
    setShowNameError(false);
    setShowEmailModal(true);
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const element = pdfTemplateRef.current;
      if (!element) return;
      
      const opt = {
        margin: 0,
        filename: `Devis_LeaderPak_${companyName.trim().replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false,
          letterRendering: true,
          width: 794,
          height: 1123,
          windowWidth: 794,
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // @ts-ignore
      const html2pdf = window.html2pdf;
      if (html2pdf) {
        await html2pdf().set(opt).from(element).save();
      }
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Erreur lors de la génération du PDF.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleEmailRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail.trim()) {
        alert("Veuillez saisir votre email.");
        return;
    }
    setIsEmailing(true);
    setTimeout(() => {
      setIsEmailing(false);
      setShowEmailModal(false);
      alert(`✅ Devis envoyé avec succès à : ${userEmail}`);
    }, 1500);
  };

  const handleFullPriceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('userName') as string;
    const email = formData.get('userEmail') as string;
    const categories: string[] = [];
    formData.getAll('categories').forEach(cat => categories.push(cat as string));

    setFullPriceFormSent(true);
    try {
      await submitPriceGridRequest({ name, email, categories });
      setTimeout(() => {
        setShowFullPriceModal(false);
        setFullPriceFormSent(false);
      }, 2500);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement de votre demande.");
      setFullPriceFormSent(false);
    }
  };

  const QuoteTemplate = ({ forExport = false }: { forExport?: boolean }) => (
    <div 
        ref={forExport ? pdfTemplateRef : null} 
        style={{ 
          width: '794px', 
          height: '1123px',
          padding: '60px', 
          backgroundColor: 'white', 
          color: '#1e293b', 
          fontFamily: "'Inter', sans-serif", 
          boxSizing: 'border-box', 
          display: 'block',
          position: 'relative',
          textAlign: 'left',
          overflow: 'hidden',
          margin: '0'
        }}
      >
        <table style={{ width: '100%', borderBottom: '4px solid #2563eb', paddingBottom: '30px', marginBottom: '40px', tableLayout: 'fixed' }}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: 'top', width: '60%' }}>
                <div style={{ fontSize: '32px', fontWeight: '900', color: '#1d4ed8', letterSpacing: '-1.5px', marginBottom: '4px' }}>LEADER PAK</div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '3px', color: '#94a3b8', fontWeight: '700' }}>Industrial Sourcing & Production</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '15px', lineHeight: '1.5' }}>
                  LeaderPak Sourcing SARL<br/>
                  Zone Industrielle, Tit Mellil, Casablanca<br/>
                  contact@leaderpak.com
                </div>
              </td>
              <td style={{ verticalAlign: 'top', textAlign: 'right', width: '40%' }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a' }}>DEVIS OFFICIEL</div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#2563eb', marginTop: '4px' }}>Réf: {quoteNumber}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '15px' }}>Date: <span style={{ color: '#1e293b', fontWeight: '700' }}>{quoteDate}</span></div>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ backgroundColor: '#f8fafc', padding: '25px', borderRadius: '15px', border: '1px solid #e2e8f0', marginBottom: '40px', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px', fontWeight: '900' }}>Client :</div>
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase' }}>{companyName || 'Non spécifié'}</div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a' }}>
              <th style={{ textAlign: 'left', padding: '15px 20px', color: 'white', fontSize: '11px', textTransform: 'uppercase', width: '40%' }}>Produit & Réf</th>
              <th style={{ textAlign: 'center', padding: '15px 20px', color: 'white', fontSize: '11px', textTransform: 'uppercase', width: '15%' }}>P.U (Dh)</th>
              <th style={{ textAlign: 'center', padding: '15px 20px', color: 'white', fontSize: '11px', textTransform: 'uppercase', width: '15%' }}>Qté</th>
              <th style={{ textAlign: 'right', padding: '15px 20px', color: 'white', fontSize: '11px', textTransform: 'uppercase', width: '30%' }}>Total TTC (Dh)</th>
            </tr>
          </thead>
          <tbody>
            {HERO_SPONGES.filter(s => quantities[s.id] > 0).map((s, idx) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? 'white' : '#fafbfc' }}>
                <td style={{ padding: '18px 20px' }}>
                  <div style={{ fontWeight: '800', fontSize: '13px', color: '#1e293b' }}>{s.name}</div>
                  <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '2px' }}>REF: {s.id.toUpperCase()}</div>
                </td>
                <td style={{ padding: '18px 20px', textAlign: 'center', fontSize: '13px' }}>{s.price.toFixed(2)}</td>
                <td style={{ padding: '18px 20px', textAlign: 'center', fontWeight: '800', fontSize: '13px' }}>{quantities[s.id]}</td>
                <td style={{ padding: '18px 20px', textAlign: 'right', fontWeight: '800', fontSize: '13px', color: '#0f172a' }}>{(quantities[s.id] * s.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ width: '100%', overflow: 'hidden' }}>
          <div style={{ float: 'right', width: '300px', backgroundColor: '#f8fafc', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 0', fontSize: '12px', color: '#64748b' }}>TOTAL HT</td>
                  <td style={{ padding: '8px 0', fontSize: '14px', fontWeight: '700', textAlign: 'right' }}>{totalHT.toFixed(2)} Dh</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 0', fontSize: '12px', color: '#64748b' }}>TVA (20%)</td>
                  <td style={{ padding: '8px 0', fontSize: '14px', fontWeight: '700', textAlign: 'right' }}>{tvaVal.toFixed(2)} Dh</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px 0 0', fontSize: '18px', fontWeight: '950', color: '#1d4ed8' }}>TOTAL TTC</td>
                  <td style={{ padding: '15px 0 0', fontSize: '18px', fontWeight: '950', color: '#1d4ed8', textAlign: 'right' }}>{totalTTC.toFixed(2)} Dh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '60px', left: '60px', right: '60px' }}>
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '25px' }}>
            <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '25px', borderRadius: '15px', fontSize: '11px', lineHeight: '1.8' }}>
              <div style={{ fontWeight: '900', color: '#3b82f6', marginBottom: '8px', textTransform: 'uppercase' }}>Conditions Commerciales :</div>
              • Règlement par virement ou chèque certifié à la commande.<br/>
              • Livraison sous 72h ouvrables après confirmation bancaire.<br/>
              • Validité de l'offre : 15 jours calendaires.
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '9px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: '800' }}>
              LeaderPak Sourcing SARL | www.leaderpak.com
            </div>
          </div>
        </div>
    </div>
  );

  return (
    <div className="p-6 md:p-12 animate-fade-in relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 no-print">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-[10px]">Étape 04 — Devis & Tarifs</span>
          <h2 className="text-xl font-bold mt-2">Simulateur Commercial</h2>
          <p className="text-slate-500 mt-2 text-sm">Gérez vos volumes et générez votre devis officiel (Format A4 - 1 page).</p>
        </div>

        <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -100, opacity: 0, pointerEvents: 'none', overflow: 'hidden', height: 0, width: 0 }}>
           <QuoteTemplate forExport={true} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16 no-print">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="p-6 text-xs font-bold uppercase text-slate-400">Variante</th>
                    <th className="p-6 text-xs font-bold uppercase text-slate-400 text-center">Prix (HT)</th>
                    <th className="p-6 text-xs font-bold uppercase text-slate-400 text-center">Qté</th>
                    <th className="p-6 text-xs font-bold uppercase text-slate-400 text-right">Total HT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {HERO_SPONGES.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-6">
                        <div className="font-bold text-slate-900">{s.name}</div>
                        <div className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">{s.usage}</div>
                      </td>
                      <td className="p-6 text-center font-bold text-slate-600">
                        {(s.price / 1.2).toFixed(2)} Dh
                      </td>
                      <td className="p-6">
                        <input type="number" min="0" value={quantities[s.id]} onChange={(e) => updateQty(s.id, e.target.value)} className="w-24 mx-auto block px-4 py-2 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-center" />
                      </td>
                      <td className="p-6 text-right font-black text-blue-600">{((quantities[s.id] * s.price) / 1.2).toFixed(2)} Dh</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-[40px] border border-blue-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shrink-0 shadow-xl shadow-blue-200"><i className="fas fa-file-invoice-dollar"></i></div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-xl font-bold text-slate-900 mb-1">Catalogue Tarifaire Intégral</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">Accédez aux prix de toutes nos autres gammes.</p>
                <button onClick={() => setShowFullPriceModal(true)} className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95">Demander les tarifs complets <i className="fas fa-arrow-right"></i></button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl sticky top-24">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3"><i className="fas fa-shopping-cart text-blue-400"></i>Synthèse</h3>
              <div className="space-y-6 mb-10">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Identification Société <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Ex: Marjane / BIM..." 
                    value={companyName} 
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      if (e.target.value.trim()) setShowNameError(false);
                    }} 
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-white transition-all ${
                      showNameError ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/20'
                    }`} 
                    required 
                  />
                  {showNameError && (
                    <p className="text-red-500 text-[10px] mt-1 font-bold">Veuillez renseigner le nom de la société</p>
                  )}
                </div>
                <div className="pt-6 border-t border-white/10 flex flex-col gap-1">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Total HT Estimé</span>
                  <span className="text-4xl font-black">{totalHT.toFixed(2)} Dh</span>
                </div>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={handleExportPDF} 
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 text-white active:scale-95"
                >
                  <i className="fas fa-file-pdf"></i>Exporter PDF
                </button>
                <button 
                  onClick={handleOpenEmailModal} 
                  className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-white"
                >
                  <i className="fas fa-envelope"></i>M'envoyer par email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODALE TARIFS COMPLETS - CONDENSÉE & DARK BLUE */}
        {showFullPriceModal && (
          <div className="fixed inset-0 z-[150] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-[40px] overflow-hidden shadow-2xl animate-scale-in flex flex-col lg:flex-row min-h-[420px]">
              
              {/* Colonne Gauche : Formulaire (50%) */}
              <div className="lg:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-tight">
                      Accès Grille <br /><span className="text-blue-600 text-3xl">Tarifaire</span>
                    </h3>
                    <button onClick={() => setShowFullPriceModal(false)} className="lg:hidden bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center text-slate-400">
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </div>
                  <p className="text-slate-500 text-sm">Consultez l'intégralité de nos prix industriels.</p>
                </div>

                {fullPriceFormSent ? (
                  <div className="py-8 text-center animate-scale-in">
                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-check text-xl"></i>
                    </div>
                    <h4 className="text-base font-bold mb-1">Demande EnvoyÉE !</h4>
                  </div>
                ) : (
                  <form onSubmit={handleFullPriceSubmit} className="space-y-4">
                    <div className="p-5 bg-slate-50 rounded-[20px] border border-slate-100">
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Catégories d'intérêt</label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          "Éponge Métallique", 
                          "Produits Plastiques", 
                          "Alum / Film Alimentaire", 
                          "Savon Beldi / Hygiène"
                        ].map(cat => (
                          <label key={cat} className="flex items-center gap-3 text-sm font-bold text-slate-700 cursor-pointer group">
                            <input type="checkbox" name="categories" value={cat} className="w-3.5 h-3.5 accent-blue-600 rounded border-slate-200" /> 
                            <span className="group-hover:text-blue-600 transition-colors">{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <input required name="userName" type="text" placeholder="Votre Nom" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 font-bold text-sm" />
                      <input required name="userEmail" type="email" placeholder="Email Pro" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 font-bold text-sm" />
                    </div>

                    <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-[16px] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-blue-700 transition-all active:scale-95">
                      Envoyer ma demande
                    </button>
                  </form>
                )}
              </div>

              {/* Colonne Droite : Responsable Commercial (50%) - BLEU SLATE-900 & SIMPLE */}
              <div className="lg:w-1/2 bg-slate-900 relative flex flex-col text-white">
                <button onClick={() => setShowFullPriceModal(false)} className="absolute top-6 right-6 z-20 bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full hidden lg:flex items-center justify-center transition-all">
                  <i className="fas fa-times text-xs"></i>
                </button>
                
                <div className="flex-1 flex flex-col p-8 relative z-10 justify-center items-center text-center">
                  <div className="relative mb-6 group">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
                      alt="Younes OUAKRIM" 
                      className="relative w-28 h-28 object-cover rounded-full shadow-2xl grayscale transition-all duration-700 group-hover:grayscale-0 border-4 border-white/10" 
                    />
                    {/* Indicateur d'état En Ligne */}
                    <div className="absolute bottom-1 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-slate-900 animate-pulse flex items-center justify-center" title="Disponible">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <h5 className="text-xl font-black uppercase tracking-tighter leading-none">M. Younes OUAKRIM</h5>
                    </div>
                    <div className="text-blue-400 font-bold uppercase text-[8px] tracking-[0.3em] opacity-80 flex items-center justify-center gap-2">
                      <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                      Responsable commercial
                      <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-5 rounded-[24px] relative max-w-[240px] mb-8 group-hover:bg-white/10 transition-colors">
                    <i className="fas fa-quote-left absolute -top-3 left-4 text-blue-500/30 text-2xl"></i>
                    <p className="text-xs italic font-medium leading-relaxed">
                      "Nous garantissons une réponse personnalisée sous 24h avec nos meilleures conditions."
                    </p>
                  </div>

                  <button 
                    onClick={() => { setShowFullPriceModal(false); onNext(); onNext(); }} 
                    className="w-full max-w-[220px] bg-blue-600 text-white py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all hover:bg-blue-700 active:scale-95 shadow-xl flex items-center justify-center gap-2 group"
                  >
                    <i className="fas fa-box-open text-base text-white"></i>
                    <span className="text-white">Recevoir un échantillon</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showPreviewModal && (
          <div className="fixed inset-0 z-[180] bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
              <div className="w-full max-w-5xl flex justify-between items-center mb-6 text-white px-2">
                  <h3 className="text-xl md:text-2xl font-black flex items-center gap-3"><i className="fas fa-eye text-blue-400"></i>Aperçu A4 (Page Unique)</h3>
                  <div className="flex gap-4">
                      <button onClick={handleDownloadPDF} disabled={isGeneratingPDF} className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold flex items-center gap-3 active:scale-95 disabled:opacity-50 transition-all shadow-xl shadow-blue-900/40">
                          {isGeneratingPDF ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-download"></i>}
                          {isGeneratingPDF ? 'Génération...' : 'Télécharger PDF'}
                      </button>
                      <button onClick={() => setShowPreviewModal(false)} className="bg-white/10 text-white w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all hover:bg-white/20">
                          <i className="fas fa-times text-xl"></i>
                      </button>
                  </div>
              </div>
              
              <div className="bg-slate-700 p-2 md:p-10 rounded-[20px] md:rounded-[40px] shadow-2xl overflow-auto w-full max-w-[850px] max-h-[85vh] flex justify-center">
                  <div className="bg-white shadow-2xl origin-top" style={{ margin: '0 auto' }}>
                    <QuoteTemplate />
                  </div>
              </div>
          </div>
        )}

        {showEmailModal && (
          <div className="fixed inset-0 z-[120] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-scale-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Envoi par Email</h3>
                <button onClick={() => setShowEmailModal(false)} className="text-slate-400 hover:text-slate-900"><i className="fas fa-times"></i></button>
              </div>
              <form onSubmit={handleEmailRequest} className="space-y-5">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Email Professionnel</label>
                  <input required type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="votre@entreprise.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold" />
                </div>
                <div className="p-4 bg-blue-50 rounded-xl text-blue-700 text-xs font-medium">
                  Le devis pour <strong>{companyName}</strong> d'un montant de <strong>{totalHT.toFixed(2)} Dh (HT)</strong> sera envoyé.
                </div>
                <button type="submit" disabled={isEmailing} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  {isEmailing ? <i className="fas fa-spinner animate-spin"></i> : <><i className="fas fa-paper-plane"></i> Confirmer l'envoi</>}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-8 border-t border-slate-100 no-print">
          <button onClick={onPrev} className="text-slate-500 font-bold px-6 py-3 uppercase text-xs tracking-widest"><i className="fas fa-chevron-left mr-2"></i> Retour</button>
          <button onClick={onNext} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold active:scale-95 uppercase text-xs tracking-widest">Suivant <i className="fas fa-arrow-right ml-2"></i></button>
        </div>
      </div>
    </div>
  );
};

export default Step4Simulator;