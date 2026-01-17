import React, { useState, useEffect } from 'react';
import { TourStep } from './types.ts';
import LandingView from './components/LandingView.tsx';
import Step1ValueProp from './components/Step1ValueProp.tsx';
import Step2HeroProduct from './components/Step2HeroProduct.tsx';
import Step3Catalog from './components/Step3Catalog.tsx';
import Step4Simulator from './components/Step4Simulator.tsx';
import Step5Credibility from './components/Step5Credibility.tsx';
import Step6Conversion from './components/Step6Conversion.tsx';
import QuickPriceAccess from './components/QuickPriceAccess.tsx';
import BuyerDashboard from './components/BuyerDashboard.tsx';
import TourProgress from './components/TourProgress.tsx';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TourStep>(TourStep.LANDING);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCatalogFilter, setActiveCatalogFilter] = useState<string>('Tous');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < TourStep.CONVERSION) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > TourStep.LANDING) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: TourStep, filter: string = 'Tous') => {
    setCurrentStep(step);
    setActiveCatalogFilter(filter);
    setIsSidebarOpen(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case TourStep.LANDING:
        return (
          <LandingView 
            onStart={() => nextStep()} 
            onExplore={() => goToStep(TourStep.CATALOG)} 
            onQuickPrices={() => goToStep(TourStep.QUICK_PRICES)}
            onDashboard={() => goToStep(TourStep.DASHBOARD)}
          />
        );
      case TourStep.VALUE_PROP:
        return <Step1ValueProp onNext={nextStep} onPrev={prevStep} onCategorySelect={(cat) => goToStep(TourStep.CATALOG, cat)} />;
      case TourStep.HERO_PRODUCT:
        return <Step2HeroProduct onNext={nextStep} onPrev={prevStep} />;
      case TourStep.CATALOG:
        return <Step3Catalog onNext={nextStep} onPrev={prevStep} initialFilter={activeCatalogFilter} />;
      case TourStep.TERMS:
        return <Step4Simulator onNext={nextStep} onPrev={prevStep} />;
      case TourStep.CREDIBILITY:
        return <Step5Credibility onNext={nextStep} onPrev={prevStep} />;
      case TourStep.CONVERSION:
        return <Step6Conversion onPrev={prevStep} onRestart={() => goToStep(TourStep.LANDING)} onDashboard={() => goToStep(TourStep.DASHBOARD)} />;
      case TourStep.QUICK_PRICES:
        return <QuickPriceAccess onBack={() => goToStep(TourStep.LANDING)} onSample={() => goToStep(TourStep.CONVERSION)} />;
      case TourStep.DASHBOARD:
        return <BuyerDashboard onBack={() => goToStep(TourStep.LANDING)} />;
      default:
        return <LandingView onStart={() => nextStep()} onExplore={() => goToStep(TourStep.CATALOG)} onQuickPrices={() => goToStep(TourStep.QUICK_PRICES)} onDashboard={() => goToStep(TourStep.DASHBOARD)} />;
    }
  };

  const isAltPage = currentStep === TourStep.QUICK_PRICES || currentStep === TourStep.DASHBOARD;
  const showHeader = currentStep !== TourStep.LANDING;

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col relative overflow-x-hidden">
      {showHeader && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-md h-16 md:h-20 flex items-center justify-between px-4 md:px-8">
          {/* LOGO : Icône seule sur mobile */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Menu"
            >
              <i className="fas fa-bars text-slate-600"></i>
            </button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => goToStep(TourStep.LANDING)}>
              <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <i className="fas fa-globe-africa text-white text-lg md:text-xl"></i>
              </div>
              <div className="hidden md:flex flex-col">
                <div className="font-bold text-lg tracking-tighter text-blue-700 leading-none">
                    LEADER<span className="text-slate-900">PAK</span>
                </div>
                <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Industrial Sourcing</div>
              </div>
            </div>
          </div>
          
          {/* TOUR PROGRESS : Design spécifique mobile (Empilé) */}
          <div className="flex-1 px-2 md:px-10">
            {!isAltPage && <TourProgress currentStep={currentStep} onStepClick={goToStep} />}
          </div>

          {/* ACTION DROITE : Flèche fine sur mobile */}
          <div className="flex items-center gap-4 shrink-0">
            {currentStep < TourStep.CONVERSION && !isAltPage && (
              <button 
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-9 h-9 md:w-auto md:px-4 md:py-2 rounded-full md:rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200"
              >
                  <span className="hidden md:inline">Suivant</span>
                  <i className="fas fa-arrow-right text-xs md:text-sm"></i>
              </button>
            )}
            {isAltPage && (
              <button 
                  onClick={() => goToStep(TourStep.LANDING)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl font-bold text-sm transition-all"
              >
                  Fermer
              </button>
            )}
          </div>
        </nav>
      )}

      <main className={`flex-1 w-full ${showHeader ? 'pt-16 md:pt-24 pb-20 md:pb-0' : ''}`}>
        {renderStep()}
      </main>

      {/* NAVIGATION ÉPINGLÉE (FOOTER MOBILE) */}
      {showHeader && !isAltPage && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 p-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex items-center justify-between gap-3">
            <button 
              onClick={prevStep}
              disabled={currentStep === TourStep.VALUE_PROP}
              className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                currentStep === TourStep.VALUE_PROP ? 'opacity-20 text-slate-400' : 'bg-slate-50 text-slate-600 active:bg-slate-100'
              }`}
            >
              <i className="fas fa-chevron-left mr-2"></i> Retour
            </button>
            <button 
              onClick={currentStep === TourStep.CONVERSION ? () => goToStep(TourStep.LANDING) : nextStep}
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95"
            >
              {currentStep === TourStep.CONVERSION ? 'Recommencer' : 'Suivant'} <i className="fas fa-arrow-right ml-2"></i>
            </button>
        </div>
      )}

      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}>
            <div className="w-72 h-full bg-white shadow-2xl p-6 flex flex-col gap-8" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                    <div className="font-bold text-xl text-blue-700 tracking-tighter">LEADER PAK</div>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-slate-900"><i className="fas fa-times"></i></button>
                </div>
                <div className="flex flex-col gap-1 overflow-y-auto">
                    {Object.values(TourStep).filter(v => typeof v === 'number').map((step) => {
                        const stepNum = step as number;
                        const labels = ["Accueil", "Vision LeaderPak", "Éponge Héros", "Nos Catalogues", "Devis Interactif", "Nos Garanties", "Contact", "Grille Tarifaire", "Dashboard Acheteur"];
                        return (
                            <button
                                key={stepNum}
                                onClick={() => goToStep(stepNum)}
                                className={`text-left px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                                    currentStep === stepNum ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {labels[stepNum]}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;