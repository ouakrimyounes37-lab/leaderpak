import React from 'react';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const Step5Credibility: React.FC<Props> = ({ onNext, onPrev }) => {
  return (
    <div className="p-6 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Étape 05 — Confiance & Crédibilité</span>
            <h2 className="text-4xl font-bold mt-2">Une Tradition de Qualité</h2>
            <p className="text-slate-500 mt-2 text-lg">Nous ne vendons pas seulement des produits ; nous bâtissons des partenariats d'approvisionnement.</p>
        </div>

        <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-4">Double Expertise Industrielle</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Notre position de producteur et importateur nous permet d’assurer stabilité, régularité et conformité des produits proposés au marché.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                <i className="fas fa-industry"></i>
                            </div>
                            <span className="font-semibold text-slate-700">Fabrication interne maîtrisée</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                <i className="fas fa-ship"></i>
                            </div>
                            <span className="font-semibold text-slate-700">Partenaires d’import sélectionnés</span>
                        </div>
                    </div>
                </div>
                <div className="order-1 md:order-2">
                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" alt="Factory" className="rounded-3xl shadow-xl" />
                </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
                <h3 className="text-2xl font-bold mb-8 text-center">Pipeline Logistique de Précision</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4 text-2xl text-blue-600">
                            <i className="fas fa-warehouse"></i>
                        </div>
                        <h4 className="font-bold mb-2">Stocks Intelligents</h4>
                        <p className="text-sm text-slate-500">Suivi en temps réel lié directement à votre portail d'achat.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4 text-2xl text-blue-600">
                            <i className="fas fa-truck-ramp-box"></i>
                        </div>
                        <h4 className="font-bold mb-2">Expédition Automatisée</h4>
                        <p className="text-sm text-slate-500">Logistique réactive garantissant des délais d’envoi optimisés.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4 text-2xl text-blue-600">
                            <i className="fas fa-tags"></i>
                        </div>
                        <h4 className="font-bold mb-2">Meilleur Prix</h4>
                        <p className="text-sm text-slate-500">Des tarifs optimisés pour offrir le meilleur rapport qualité / coût.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center text-center py-10">
                <div className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em] mb-4">Témoignage Partenaire</div>
                <blockquote className="text-2xl font-medium text-slate-800 italic max-w-3xl mb-6">
                    "Vedal a révolutionné notre rayon entretien. La constance de la qualité produit est inégalée à ce niveau de prix."
                </blockquote>
                <div className="font-bold text-slate-900">Responsable Achats Senior, Supeco</div>
            </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-slate-100">
            <button onClick={onPrev} className="text-slate-500 hover:text-slate-900 font-semibold px-6 py-3">
                <i className="fas fa-chevron-left mr-2"></i> Retour
            </button>
            <button onClick={onNext} className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all flex items-center gap-3 shadow-lg shadow-blue-200">
                Finaliser la Collaboration
                <i className="fas fa-arrow-right"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Step5Credibility;