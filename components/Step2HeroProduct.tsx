
import React, { useState, useEffect, useRef } from 'react';
import { HERO_SPONGES } from '../constants.tsx';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const Step2HeroProduct: React.FC<Props> = ({ onNext, onPrev }) => {
  const [selectedSponge, setSelectedSponge] = useState<any>(null);
  
  const [customUnits, setCustomUnits] = useState<number | string>("");
  const [packagingOption, setPackagingOption] = useState<string>("Packaging sur-mesure");
  
  const [cartonLength, setCartonLength] = useState<string>("");
  const [cartonWidth, setCartonWidth] = useState<string>("");
  const [cartonHeight, setCartonHeight] = useState<string>("");

  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [clientName, setClientName] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedSponge) {
      setCustomUnits("");
      setPackagingOption("Packaging sur-mesure");
      setCartonLength("");
      setCartonWidth("");
      setCartonHeight("");
    }
  }, [selectedSponge]);

  const handleDownloadPDF = async () => {
    if (!clientName.trim()) {
      alert("Veuillez saisir le nom du client.");
      return;
    }
    setIsGeneratingPDF(true);
    try {
      const element = pdfTemplateRef.current;
      if (!element) return;
      
      const opt = {
        margin: 0,
        filename: `Spec_Technique_${selectedSponge.name.replace(/\s+/g, '_')}_${clientName.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // @ts-ignore
      const html2pdf = window.html2pdf;
      if (html2pdf) {
        await html2pdf().set(opt).from(element).save();
      }
      setShowDownloadPopup(false);
      setClientName("");
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Erreur lors de la génération du PDF.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const TechnicalSpecPDF = () => (
    <div 
      ref={pdfTemplateRef}
      style={{ 
        width: '210mm', 
        minHeight: '297mm',
        padding: '20mm', 
        backgroundColor: 'white', 
        color: '#1e293b', 
        fontFamily: "'Inter', sans-serif",
        boxSizing: 'border-box'
      }}
    >
      <div style={{ borderBottom: '4px solid #2563eb', paddingBottom: '10mm', marginBottom: '10mm', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28pt', fontWeight: '900', color: '#1d4ed8', margin: '0' }}>LEADER PAK</h1>
          <p style={{ fontSize: '10pt', color: '#64748b', textTransform: 'uppercase', margin: '5px 0 0', fontWeight: '700', letterSpacing: '2px' }}>Fiche de Spécification Logistique</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '10pt', color: '#64748b', margin: '0' }}>Date: <strong>{new Date().toLocaleDateString('fr-FR')}</strong></p>
          <p style={{ fontSize: '10pt', color: '#64748b', margin: '5px 0 0' }}>Client: <strong style={{ color: '#0f172a' }}>{clientName.toUpperCase()}</strong></p>
        </div>
      </div>
      
      <div style={{ marginBottom: '10mm' }}>
        <h2 style={{ fontSize: '16pt', fontWeight: '900', marginBottom: '15px', color: '#0f172a', borderLeft: '4px solid #2563eb', paddingLeft: '10px' }}>SPÉCIFICATIONS PRODUIT</h2>
        <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '10px 0', fontSize: '11pt', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Désignation</td>
                <td style={{ padding: '10px 0', fontSize: '12pt', fontWeight: '800', textAlign: 'right', borderBottom: '1px solid #e2e8f0' }}>{selectedSponge?.name}</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 0', fontSize: '11pt', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Matériau principal</td>
                <td style={{ padding: '10px 0', fontSize: '11pt', fontWeight: '700', textAlign: 'right', borderBottom: '1px solid #e2e8f0' }}>{selectedSponge?.tech?.material}</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 0', fontSize: '11pt', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Durabilité</td>
                <td style={{ padding: '10px 0', fontSize: '11pt', fontWeight: '700', textAlign: 'right', borderBottom: '1px solid #e2e8f0' }}>Haute Performance</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 0', fontSize: '11pt', color: '#64748b' }}>Traitement de surface</td>
                <td style={{ padding: '10px 0', fontSize: '11pt', fontWeight: '700', textAlign: 'right' }}>Anti-Corrosion</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginBottom: '10mm' }}>
        <h2 style={{ fontSize: '16pt', fontWeight: '900', marginBottom: '15px', color: '#0f172a', borderLeft: '4px solid #2563eb', paddingLeft: '10px' }}>CONFIGURATION LOGISTIQUE VALIDÉE</h2>
        <div style={{ border: '2px solid #0f172a', borderRadius: '15px', padding: '25px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '12px 0', fontSize: '11pt', color: '#64748b', borderBottom: '1px solid #f1f5f9' }}>Nombre d'unités par carton</td>
                <td style={{ padding: '12px 0', fontSize: '14pt', fontWeight: '900', textAlign: 'right', color: '#2563eb', borderBottom: '1px solid #f1f5f9' }}>{customUnits} pièces</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 0', fontSize: '11pt', color: '#64748b', borderBottom: '1px solid #f1f5f9' }}>Dimensions du packaging (L x l x H)</td>
                <td style={{ padding: '12px 0', fontSize: '12pt', fontWeight: '800', textAlign: 'right', borderBottom: '1px solid #f1f5f9' }}>{cartonLength} cm x {cartonWidth} cm x {cartonHeight} cm</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 0', fontSize: '11pt', color: '#64748b' }}>Type de packaging sélectionné</td>
                <td style={{ padding: '12px 0', fontSize: '12pt', fontWeight: '800', textAlign: 'right' }}>{packagingOption}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '20mm', padding: '15px', backgroundColor: '#0f172a', borderRadius: '10px', color: 'white' }}>
        <p style={{ margin: '0', fontSize: '9pt', textAlign: 'center', lineHeight: '1.5' }}>
          Ce document constitue une spécification technique officielle pour la production B2B.<br/>
          LeaderPak Sourcing SARL | Zone Industrielle Tit Mellil, Casablanca | contact@leaderpak.com
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-10 text-center md:text-left">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Étape 02 — Focus Produit</span>
            <h2 className="text-xl md:text-3xl font-bold mt-2">La Gamme VEDAL Métal</h2>
            <p className="text-slate-500 mt-2 text-sm md:text-base">Nos éponges métalliques sont conçues pour répondre à vos exigences professionnelles et s’adapter à vos standards logistiques.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {HERO_SPONGES.map((sponge) => (
                <div key={sponge.id} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col text-center md:text-left">
                    <div className="h-52 overflow-hidden relative">
                        <img src={sponge.image} alt={sponge.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-blue-600 text-xs shadow-sm">
                            Vedal
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col items-center md:items-start">
                        <h3 className="font-bold text-xl mb-2">{sponge.name}</h3>
                        <p className="text-xs text-slate-500 mb-6 flex-1 leading-relaxed">{sponge.description}</p>
                        
                        <button 
                            onClick={() => setSelectedSponge(sponge)}
                            className="w-full py-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all mt-auto flex items-center justify-center gap-2"
                        >
                            <i className="fas fa-sliders"></i> Configurer Packaging
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {selectedSponge && (
          <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl overflow-y-auto flex justify-center p-0 md:p-8 items-start md:items-center">
              <div className="bg-white w-full max-w-7xl h-fit md:rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.4)] flex flex-col lg:flex-row my-0 md:my-8 overflow-hidden">
                  
                  {/* Left Hero Section (Produit) */}
                  <div className="lg:w-[45%] bg-slate-50 relative flex flex-col shrink-0 border-r border-slate-100">
                      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent opacity-50 z-10"></div>
                      
                      <div className="p-6 md:p-10 relative z-20 flex flex-col h-full">
                          <div className="flex justify-between items-start mb-6 md:mb-10">
                              <div>
                                  <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2 md:mb-3">LeaderPak</span>
                                  <h3 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">{selectedSponge.name}</h3>
                              </div>
                              <button 
                                  onClick={() => setSelectedSponge(null)}
                                  className="lg:hidden bg-white/80 backdrop-blur w-10 h-10 rounded-full flex items-center justify-center shadow-lg text-slate-400 hover:text-slate-900"
                              >
                                  <i className="fas fa-times"></i>
                              </button>
                          </div>

                          <div className="flex-1 flex items-center justify-center py-4 md:py-10">
                              <div className="relative group w-full max-w-[200px] md:max-w-sm aspect-square">
                                  <div className="absolute inset-0 bg-blue-600/5 rounded-[32px] md:rounded-[48px] rotate-6 group-hover:rotate-3 transition-transform duration-700"></div>
                                  <img 
                                      src={selectedSponge.image} 
                                      alt={selectedSponge.name} 
                                      className="relative w-full h-full object-cover rounded-[32px] md:rounded-[48px] transition-transform duration-1000 group-hover:scale-105" 
                                  />
                                  <div className="absolute -bottom-4 -right-4 bg-white p-3 md:p-6 rounded-[18px] md:rounded-[28px] shadow-xl border border-slate-100 hidden md:block animate-float">
                                      <div className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">Qualité Inox</div>
                                      <div className="text-blue-600 font-bold text-sm md:text-xl uppercase tracking-tighter">VEDAL Inox 410</div>
                                  </div>
                              </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 md:gap-4 mt-auto">
                              <div className="bg-white p-4 md:p-6 rounded-[20px] md:rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-3 md:gap-4">
                                  <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-50 text-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                                      <i className="fas fa-shield-halved text-sm md:text-xl"></i>
                                  </div>
                                  <div>
                                      <div className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Durabilité</div>
                                      <div className="font-bold text-slate-900 text-[10px] md:text-sm">Renforcée</div>
                                  </div>
                              </div>
                              <div className="bg-white p-4 md:p-6 rounded-[20px] md:rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-3 md:gap-4">
                                  <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-50 text-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                                      <i className="fas fa-microchip text-sm md:text-xl"></i>
                                  </div>
                                  <div>
                                      <div className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Traitement</div>
                                      <div className="font-bold text-slate-900 text-[10px] md:text-sm">Anti-Corrosion</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Right Configuration Section */}
                  <div className="lg:w-[55%] flex flex-col bg-white">
                      {/* Header Desktop */}
                      <div className="hidden lg:flex justify-between items-center p-8 border-b border-slate-50">
                          <div>
                              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Configuration Logistique</h4>
                              <p className="text-slate-500 text-xs mt-1">Établissez vos standards pour la production industrielle.</p>
                          </div>
                          <button 
                              onClick={() => setSelectedSponge(null)}
                              className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all flex items-center justify-center"
                          >
                              <i className="fas fa-times text-xl"></i>
                          </button>
                      </div>

                      <div className="p-6 md:p-12 space-y-8 md:space-y-12">
                          
                          {/* Info Box */}
                          <div className="p-5 md:p-8 bg-blue-50/50 border-2 border-dashed border-blue-100 rounded-[24px] md:rounded-[32px] flex items-center gap-4 md:gap-6">
                              <div className="w-10 h-10 md:w-16 md:h-16 bg-blue-600 text-white rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                                  <i className="fas fa-box-open text-xl md:text-2xl"></i>
                              </div>
                              <p className="text-blue-900 text-xs md:text-base font-semibold leading-tight md:leading-relaxed">
                                  Configuration sur-mesure adaptée à vos linéaires.
                              </p>
                          </div>

                          <div className="space-y-8 md:space-y-12">
                              {/* Unit input */}
                              <div className="group">
                                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                      <div className="w-1 h-5 md:w-1.5 md:h-6 bg-blue-600 rounded-full"></div>
                                      <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">Unités / Carton Master</label>
                                  </div>
                                  <div className="relative max-w-md">
                                      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-slate-400">
                                          <i className="fas fa-boxes"></i>
                                      </div>
                                      <input 
                                          type="number" 
                                          value={customUnits}
                                          onChange={(e) => setCustomUnits(e.target.value)}
                                          placeholder="Ex: 240"
                                          className="w-full pl-12 md:pl-16 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 font-bold transition-all text-center md:text-left"
                                      />
                                  </div>
                              </div>

                              {/* Dimensions inputs */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Longueur (cm)</label>
                                      <input type="number" value={cartonLength} onChange={(e) => setCartonLength(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 font-bold text-center md:text-left" />
                                  </div>
                                  <div>
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Largeur (cm)</label>
                                      <input type="number" value={cartonWidth} onChange={(e) => setCartonWidth(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 font-bold text-center md:text-left" />
                                  </div>
                                  <div>
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Hauteur (cm)</label>
                                      <input type="number" value={cartonHeight} onChange={(e) => setCartonHeight(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 font-bold text-center md:text-left" />
                                  </div>
                              </div>

                          </div>

                          <div className="mt-12 pt-8 border-t border-slate-50 flex gap-4">
                              <button 
                                  onClick={() => setShowDownloadPopup(true)}
                                  className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                              >
                                  <i className="fas fa-file-pdf"></i> Générer Fiche Technique
                              </button>
                              <button 
                                  onClick={() => setSelectedSponge(null)}
                                  className="px-8 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all"
                              >
                                  Fermer
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        )}

        {showDownloadPopup && (
            <div className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center md:text-left">Finaliser le document</h3>
                    <div className="space-y-4 mb-8">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 text-center md:text-left">Nom de l'enseigne / Client</label>
                            <input 
                                type="text" 
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                placeholder="Ex: CARREFOUR"
                                className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 font-bold text-center md:text-left"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleDownloadPDF}
                            disabled={isGeneratingPDF}
                            className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isGeneratingPDF ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-download"></i>}
                            Télécharger le PDF
                        </button>
                        <button onClick={() => setShowDownloadPopup(false)} className="px-6 py-4 bg-slate-100 text-slate-500 rounded-xl font-bold hover:bg-slate-200">Annuler</button>
                    </div>
                </div>
            </div>
        )}

        <div style={{ display: 'none' }}>
            <TechnicalSpecPDF />
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-slate-100">
            <button onClick={onPrev} className="text-slate-500 hover:text-slate-900 font-semibold px-6 py-3">
                <i className="fas fa-chevron-left mr-2"></i> Retour
            </button>
            <button onClick={onNext} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-3">
                Voir le Catalogue Complet
                <i className="fas fa-arrow-right"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Step2HeroProduct;
