import React, { useState, useEffect, useRef } from 'react';
import { HERO_SPONGES } from '../constants.tsx';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const Step2HeroProduct: React.FC<Props> = ({ onNext, onPrev }) => {
  const [selectedSponge, setSelectedSponge] = useState<any>(null);
  
  const [customUnits, setCustomUnits] = useState<number>(240);
  const [packagingOption, setPackagingOption] = useState<string>("Packaging sur-mesure");
  
  const [cartonLength, setCartonLength] = useState<string>("60");
  const [cartonWidth, setCartonWidth] = useState<string>("40");
  const [cartonHeight, setCartonHeight] = useState<string>("30");

  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [clientName, setClientName] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedSponge) {
      setCustomUnits(240);
      setPackagingOption("Packaging sur-mesure");
      setCartonLength("60");
      setCartonWidth("40");
      setCartonHeight("30");
    }
  }, [selectedSponge]);

  const unitsPerBox = [48, 96, 120, 240, 480];

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
        <div className="mb-10">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Étape 02 — Focus Produit</span>
            <h2 className="text-4xl font-bold mt-2">La Gamme VEDAL Métal</h2>
            <p className="text-slate-500 mt-2 text-lg">Nos éponges métalliques sont conçues pour répondre à vos exigences professionnelles et s’adapter à vos standards logistiques.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {HERO_SPONGES.map((sponge) => (
                <div key={sponge.id} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col">
                    <div className="h-52 overflow-hidden relative">
                        <img src={sponge.image} alt={sponge.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-blue-600 text-xs shadow-sm">
                            Vedal
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
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
          <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-6xl rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row max-h-[95vh]">
                  <div className="lg:w-5/12 bg-slate-50 p-8 lg:p-12 flex flex-col border-r border-slate-100">
                      <div className="mb-8">
                        <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Fiche Technique Produit</span>
                        <h3 className="text-3xl font-black text-slate-900 mt-2 uppercase tracking-tighter">{selectedSponge.name}</h3>
                      </div>
                      <div className="relative aspect-square rounded-[32px] overflow-hidden shadow-2xl bg-white mb-10 group">
                          <img src={selectedSponge.image} alt={selectedSponge.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-4 rounded-2xl text-white">
                                <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">Qualité Matériau</div>
                                <div className="font-bold text-lg">{selectedSponge.tech.material}</div>
                            </div>
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Durabilité</div>
                              <div className="font-bold text-slate-900">Haute Performance</div>
                          </div>
                          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Traitement</div>
                              <div className="font-bold text-slate-900">Anti-Corrosion</div>
                          </div>
                      </div>
                  </div>
                  <div className="lg:w-7/12 p-8 lg:p-12 overflow-y-auto">
                      <div className="flex justify-between items-center mb-10">
                          <div>
                              <h4 className="text-2xl font-bold text-slate-900">Configuration Logistique</h4>
                              <p className="text-slate-500 text-sm mt-1 italic">Personnalisez chaque aspect de votre commande B2B.</p>
                          </div>
                          <button 
                              onClick={() => setSelectedSponge(null)}
                              className="bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-400 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                          >
                              <i className="fas fa-times text-xl"></i>
                          </button>
                      </div>
                      <div className="space-y-10">
                          <div>
                              <div className="flex justify-between items-end mb-4">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Unités par Carton</label>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-400 italic">Saisie libre :</span>
                                  <input 
                                    type="number" 
                                    value={customUnits} 
                                    onChange={(e) => setCustomUnits(parseInt(e.target.value) || 0)}
                                    className="w-20 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-5 gap-3">
                                  {unitsPerBox.map(u => (
                                      <button 
                                          key={u}
                                          onClick={() => setCustomUnits(u)}
                                          className={`py-4 rounded-2xl text-xs font-bold transition-all border-2 ${
                                              customUnits === u 
                                              ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-105' 
                                              : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                                          }`}
                                      >
                                          {u}
                                      </button>
                                  ))}
                              </div>
                          </div>
                          <div>
                              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Ajuster la taille de packaging (Longueur, Largeur, Hauteur en cm)</label>
                              <div className="grid grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                      <label className="text-[9px] font-black text-slate-400 uppercase">Longueur</label>
                                      <input type="number" value={cartonLength} onChange={(e) => setCartonLength(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[9px] font-black text-slate-400 uppercase">Largeur</label>
                                      <input type="number" value={cartonWidth} onChange={(e) => setCartonWidth(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[9px] font-black text-slate-400 uppercase">Hauteur</label>
                                      <input type="number" value={cartonHeight} onChange={(e) => setCartonHeight(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" />
                                  </div>
                              </div>
                          </div>
                          <div className="p-8 bg-blue-600 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
                              <h5 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <i className="fas fa-clipboard-list"></i> Résumé de la configuration
                              </h5>
                              <div className="grid grid-cols-2 gap-y-6 text-sm">
                                  <div>
                                      <div className="opacity-60 text-[10px] font-black uppercase tracking-widest mb-1">Produit de base</div>
                                      <div className="font-bold text-lg">{selectedSponge.name}</div>
                                  </div>
                                  <div className="text-right">
                                      <div className="opacity-60 text-[10px] font-black uppercase tracking-widest mb-1">Packaging choisi</div>
                                      <div className="font-bold text-lg">{packagingOption}</div>
                                  </div>
                                  <div className="pt-4 border-t border-white/20">
                                      <div className="opacity-60 text-[10px] font-black uppercase tracking-widest mb-1">Unités / Carton</div>
                                      <div className="font-bold text-xl">{customUnits}</div>
                                  </div>
                                  <div className="pt-4 border-t border-white/20 text-right">
                                      <div className="opacity-60 text-[10px] font-black uppercase tracking-widest mb-1">Dimensions du Carton</div>
                                      <div className="font-bold text-xl">{cartonLength}x{cartonWidth}x{cartonHeight} cm</div>
                                  </div>
                              </div>
                              <button onClick={() => setShowDownloadPopup(true)} className="w-full mt-10 py-5 bg-white text-blue-700 hover:bg-blue-50 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95">Confirmer cette Spécification</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        )}

        {showDownloadPopup && (
          <div className="fixed inset-0 z-[150] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tighter">Confirmation Spécification</h3>
                <button onClick={() => setShowDownloadPopup(false)} className="text-slate-400 hover:text-slate-900"><i className="fas fa-times"></i></button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Nom du Client / Société</label>
                  <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Ex: Marjane, BIM..." className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 font-bold transition-all" />
                </div>
                <button onClick={handleDownloadPDF} disabled={isGeneratingPDF || !clientName.trim()} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95">
                  {isGeneratingPDF ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-file-pdf"></i>}
                  {isGeneratingPDF ? "Génération en cours..." : "Télécharger PDF"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
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