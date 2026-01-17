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
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // @ts-ignore
      const html2pdf = window.html2pdf;
      if (html2pdf) {
        await html2pdf().set(opt).from(element).save();
      }
    } catch (error) {
      console.error("PDF Export Error:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleEmailRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailing(true);
    setTimeout(() => {
      setIsEmailing(false);
      setShowEmailModal(false);
      alert(`✅ Devis envoyé avec succès.`);
    }, 1500);
  };

  const handleFullPriceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFullPriceFormSent(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    try {
      await submitPriceGridRequest({ 
        name: formData.get('userName') as string, 
        email: formData.get('userEmail') as string, 
        categories: formData.getAll('categories') as string[] 
      });
      setTimeout(() => { setShowFullPriceModal(false); setFullPriceFormSent(false); }, 2500);
    } catch (error) {
      setFullPriceFormSent(false);
    }
  };

  const QuoteTemplate = ({ forExport = false }: { forExport?: boolean }) => (
    <div ref={forExport ? pdfTemplateRef : null} style={{ width: '794px', height: '1123px', padding: '60px', backgroundColor: 'white', color: '#1e293b', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' }}>
      <div style={{ borderBottom: '4px solid #2563eb', paddingBottom: '30px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '32px', fontWeight: '900', color: '#1d4ed8' }}>LEADER PAK</div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8' }}>Sourcing & Production</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: '900' }}>DEVIS</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Réf: {quoteNumber}</div>
        </div>
      </div>
      <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '15px', marginBottom: '30px' }}>
        <div style={{ fontSize: '18px', fontWeight: '900' }}>{companyName || 'Société non spécifiée'}</div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ backgroundColor: '#0f172a', color: 'white' }}><th style={{ textAlign: 'left', padding: '12px' }}>Produit</th><th style={{ textAlign: 'right', padding: '12px' }}>Total (Dh)</th></tr></thead>
        <tbody>{HERO_SPONGES.filter(s => quantities[s.id] > 0).map(s => (<tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}><td style={{ padding: '12px' }}>{s.name} (x{quantities[s.id]})</td><td style={{ padding: '12px', textAlign: 'right' }}>{(quantities[s.id] * s.price).toFixed(2)}</td></tr>))}</tbody>
      </table>
      <div style={{ marginTop: '40px', textAlign: 'right', fontSize: '20px', fontWeight: '900' }}>TOTAL TTC: {totalTTC.toFixed(2)} Dh</div>
    </div>
  );

  return (
    <div className="p-4 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="no-print">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-[10px] md:text-sm">Étape 04 — Devis & Tarifs</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-1">Simulateur Commercial</h2>
        </div>

        {/* REORGANISATION MOBILE : CALCULATEUR -> SYNTHESE -> AUTRES PRIX */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 no-print">
          
          {/* 1. CALCULATEUR (Tableau compact) */}
          <div className="lg:col-span-2 order-1">
            <div className="bg-white border border-slate-100 rounded-3xl overflow-x-auto shadow-sm">
              <table className="w-full text-left min-w-[380px]">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr className="text-[9px] md:text-xs text-slate-400 uppercase font-black">
                    <th className="p-4">Produit</th>
                    <th className="p-4 text-center">Qté</th>
                    <th className="p-4 text-right">Total HT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {HERO_SPONGES.map(s => (
                    <tr key={s.id} className="text-[11px] md:text-sm">
                      <td className="p-4 font-bold text-slate-900 leading-tight">
                        {s.name} <br/><span className="text-[9px] text-slate-400 font-normal uppercase">{s.usage}</span>
                      </td>
                      <td className="p-4">
                        <input type="number" min="0" value={quantities[s.id]} onChange={(e) => updateQty(s.id, e.target.value)} className="w-16 mx-auto block px-2 py-2 border rounded-xl font-bold text-center text-[10px]" />
                      </td>
                      <td className="p-4 text-right font-black text-blue-600">
                        {((quantities[s.id] * s.price) / 1.2).toFixed(2)} Dh
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. SYNTHESE (Panier / Identification) */}
          <div className="lg:col-span-1 order-2">
            <div className="bg-slate-900 rounded-[32px] md:rounded-[40px] p-6 md:p-10 text-white shadow-2xl sticky top-24">
              <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-3"><i className="fas fa-shopping-cart text-blue-400"></i>Synthèse</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Identification Société</label>
                  <input type="text" placeholder="Ex: Marjane, BIM..." value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none text-xs font-bold text-white transition-all" />
                </div>
                <div className="pt-6 border-t border-white/10 flex flex-col gap-1 text-center md:text-left">
                  <span className="text-[9px] md:text-[10px] font-bold text-blue-400 uppercase tracking-widest">Total HT Estimé</span>
                  <span className="text-3xl md:text-4xl font-black">{totalHT.toFixed(2)} Dh</span>
                </div>
                <div className="grid grid-cols-1 gap-3 pt-4">
                  <button onClick={handleExportPDF} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-white text-xs uppercase tracking-widest">
                    <i className="fas fa-file-pdf"></i>Exporter PDF
                  </button>
                  <button onClick={handleOpenEmailModal} className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-white text-xs uppercase tracking-widest">
                    <i className="fas fa-envelope"></i>Email
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. ACCES AUTRES PRIX */}
          <div className="lg:col-span-2 order-3">
            <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-white rounded-[32px] md:rounded-[40px] border border-blue-100 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-sm">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl md:text-3xl shrink-0 shadow-lg shadow-blue-200"><i className="fas fa-file-invoice-dollar"></i></div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-base md:text-xl font-bold text-slate-900 mb-1">Catalogue Tarifaire Intégral</h4>
                <p className="text-[11px] md:text-sm text-slate-500 mb-5 leading-relaxed">Consultez les prix de toutes nos gammes (Plastique, Alu, Hygiène).</p>
                <button onClick={() => setShowFullPriceModal(true)} className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-100">Demander les tarifs complets</button>
              </div>
            </div>
          </div>
        </div>

        {/* Modales Responsive Plein Écran */}
        {showFullPriceModal && (
          <div className="fixed inset-0 z-[150] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl my-auto p-6 md:p-10 relative">
               <button onClick={() => setShowFullPriceModal(false)} className="absolute top-4 right-4 text-slate-400"><i className="fas fa-times"></i></button>
               <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">Accès Tarifs</h3>
               <form onSubmit={handleFullPriceSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input required name="userName" type="text" placeholder="Nom Complet" className="w-full px-5 py-3 bg-slate-50 border rounded-xl text-xs font-bold" />
                    <input required name="userEmail" type="email" placeholder="Email Pro" className="w-full px-5 py-3 bg-slate-50 border rounded-xl text-xs font-bold" />
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border">
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-2">Intérêts</label>
                    {["Plastique", "Alu", "Hygiène"].map(cat => (
                      <label key={cat} className="flex items-center gap-3 text-xs font-bold py-1"><input type="checkbox" name="categories" value={cat}/> {cat}</label>
                    ))}
                  </div>
                  <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Confirmer la demande</button>
               </form>
            </div>
          </div>
        )}

        {showPreviewModal && (
          <div className="fixed inset-0 z-[180] bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-2 overflow-y-auto">
            <div className="w-full max-w-2xl flex justify-between items-center mb-4 text-white px-2 shrink-0">
               <h3 className="text-sm md:text-lg font-black uppercase tracking-widest">Aperçu Devis</h3>
               <div className="flex gap-2">
                 <button onClick={handleDownloadPDF} className="bg-blue-600 px-4 py-2 rounded-xl text-[10px] font-bold uppercase"><i className="fas fa-download mr-1"></i> PDF</button>
                 <button onClick={() => setShowPreviewModal(false)} className="bg-white/10 w-8 h-8 rounded-xl flex items-center justify-center"><i className="fas fa-times"></i></button>
               </div>
            </div>
            <div className="bg-white p-2 rounded-xl overflow-auto w-full max-w-[800px] shadow-2xl flex justify-start md:justify-center">
              <div className="scale-[0.4] sm:scale-75 md:scale-100 origin-top-left md:origin-top">
                <QuoteTemplate />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step4Simulator;