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

  const nextStep = () => {
    if (currentStep < TourStep.CONVERSION) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > TourStep.LANDING) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step: TourStep, filter: string = 'Tous') => {
    setCurrentStep(step);
    setActiveCatalogFilter(filter);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        return <Step1ValueProp 
          onNext={nextStep} 
          onPrev={prevStep} 
          onCategorySelect={(cat) => goToStep(TourStep.CATALOG, cat)} 
        />;
      case TourStep.HERO_PRODUCT:
        return <Step2HeroProduct onNext={nextStep} onPrev={prevStep} />;
      case TourStep.CATALOG:
        return <Step3Catalog 
          onNext={nextStep} 
          onPrev={prevStep} 
          initialFilter={activeCatalogFilter}
        />;
      case TourStep.TERMS:
        return <Step4Simulator onNext={nextStep} onPrev={prevStep} />;
      case TourStep.CREDIBILITY:
        return <Step5Credibility onNext={nextStep} onPrev={prevStep} />;
      case TourStep.CONVERSION:
        return <Step6Conversion 
          onPrev={prevStep} 
          onRestart={() => goToStep(TourStep.LANDING)} 
          onDashboard={() => goToStep(TourStep.DASHBOARD)}
        />;
      case TourStep.QUICK_PRICES:
        return <QuickPriceAccess onBack={() => goToStep(TourStep.LANDING)} onSample={() => goToStep(TourStep.CONVERSION)} />;
      case TourStep.DASHBOARD:
        return <BuyerDashboard onBack={() => goToStep(TourStep.LANDING)} />;
      default:
        return <LandingView onStart={() => nextStep()} onExplore={() => goToStep(TourStep.CATALOG)} onQuickPrices={() => goToStep(TourStep.QUICK_PRICES)} onDashboard={() => goToStep(TourStep.DASHBOARD)} />;
    }
  };

  const isAltPage = currentStep === TourStep.QUICK_PRICES || currentStep === TourStep.DASHBOARD;

  return (
    <div className="min-h-screen w-screen bg-white text-slate-900 flex flex-col relative overflow-x-hidden">
      {/* Header Épinglé */}
      {currentStep !== TourStep.LANDING && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-md px-4 md:px-8 py-3 flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Menu"
            >
              <i className="fas fa-bars text-slate-600"></i>
            </button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => goToStep(TourStep.LANDING)}>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
                <i className="fas fa-globe-africa text-white text-xl"></i>
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-lg tracking-tighter text-blue-700 leading-none">
                    LEADER<span className="text-slate-900">PAK</span>
                </div>
                <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Industrial Sourcing</div>
              </div>
            </div>
          </div>
          
          {!isAltPage && <TourProgress currentStep={currentStep} onStepClick={goToStep} />}

          <div className="flex items-center gap-4">
            {currentStep < TourStep.CONVERSION && !isAltPage && (
              <button 
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
              >
                  <span className="hidden sm:inline">Suivant</span>
                  <i className="fas fa-arrow-right"></i>
              </button>
            )}
            {isAltPage && (
              <button 
                  onClick={() => goToStep(TourStep.LANDING)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all"
              >
                  Fermer
              </button>
            )}
          </div>
        </nav>
      )}

      {/* Contenu principal */}
      <main className={`flex-1 w-full ${currentStep !== TourStep.LANDING ? 'pt-24' : ''}`}>
        {renderStep()}
      </main>

      {/* Sidebar Mobile */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
        >
            <div 
                className="w-72 h-full bg-white shadow-2xl p-6 flex flex-col gap-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <div className="font-bold text-xl text-blue-700 tracking-tighter">LEADER PAK</div>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-slate-900">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    {Object.values(TourStep).filter(v => typeof v === 'number').map((step) => {
                        const stepNum = step as number;
                        const labels = ["Accueil", "Vision LeaderPak", "Éponge Héros", "Nos Catalogues", "Devis Interactif", "Nos Garanties", "Contact", "Grille Tarifaire", "Dashboard Acheteur"];
                        return (
                            <button
                                key={stepNum}
                                onClick={() => goToStep(stepNum)}
                                className={`text-left px-4 py-3 rounded-xl transition-all font-medium ${
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