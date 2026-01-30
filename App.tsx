
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
import AdminLogin from './components/AdminLogin.tsx';
import AdminStats from './components/AdminStats.tsx';
import TourProgress from './components/TourProgress.tsx';
import { logVisit } from './supabaseService.ts';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TourStep>(TourStep.LANDING);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCatalogFilter, setActiveCatalogFilter] = useState<string>('Tous');

  // Tracking automatique des visites au chargement
  useEffect(() => {
    logVisit();
  }, []);

  // Réinitialisation forcée du scroll
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
      case TourStep.ADMIN_LOGIN:
        return <AdminLogin onLoginSuccess={() => goToStep(TourStep.ADMIN_STATS)} onBack={() => goToStep(TourStep.LANDING)} />;
      case TourStep.ADMIN_STATS:
        return <AdminStats onBack={() => goToStep(TourStep.LANDING)} />;
      default:
        return <LandingView onStart={() => nextStep()} onExplore={() => goToStep(TourStep.CATALOG)} onQuickPrices={() => goToStep(TourStep.QUICK_PRICES)} onDashboard={() => goToStep(TourStep.DASHBOARD)} />;
    }
  };

  const isAltPage = currentStep === TourStep.QUICK_PRICES || currentStep === TourStep.DASHBOARD || currentStep === TourStep.ADMIN_LOGIN || currentStep === TourStep.ADMIN_STATS;
  
  const totalTourSteps = 6; 
  const progressPercent = currentStep >= 1 && currentStep <= 6 
    ? (currentStep / totalTourSteps) * 100 
    : 0;

  return (
    <div className="min-h-screen w-screen bg-white text-slate-900 flex flex-col relative overflow-x-hidden">
      {currentStep !== TourStep.LANDING && (
        <nav className="fixed bottom-0 md:top-0 md:bottom-auto left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t md:border-t-0 md:border-b border-slate-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] md:shadow-sm flex flex-col">
          {!isAltPage && (
            <div className="w-full h-[2px] bg-slate-100 relative overflow-hidden md:hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
            </div>
          )}

          {/* DESKTOP NAV */}
          <div className="hidden md:flex px-8 py-3 items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <i className="fas fa-bars text-slate-600"></i>
              </button>
              
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => goToStep(TourStep.LANDING)}>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
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
                    <span>Suivant</span>
                    <i className="fas fa-arrow-right text-sm"></i>
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
          </div>

          {/* MOBILE NAV */}
          <div className="flex md:hidden items-center justify-between px-4 h-[85px] w-full pb-2">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-600 rounded-xl active:bg-slate-100 transition-colors shrink-0"
            >
              <i className="fas fa-bars text-sm"></i>
            </button>

            <div className="flex-1 flex justify-center px-2 overflow-visible">
              {!isAltPage && <TourProgress currentStep={currentStep} onStepClick={goToStep} />}
            </div>

            <div className="w-10 h-10 shrink-0">
              {currentStep < TourStep.CONVERSION && !isAltPage ? (
                <button 
                  onClick={nextStep}
                  className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 active:scale-90 transition-all"
                >
                  <i className="fas fa-arrow-right text-xs"></i>
                </button>
              ) : isAltPage ? (
                <button onClick={() => goToStep(TourStep.LANDING)} className="w-10 h-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center">
                  <i className="fas fa-times text-xs"></i>
                </button>
              ) : null}
            </div>
          </div>
        </nav>
      )}

      <main className={`flex-1 w-full ${currentStep !== TourStep.LANDING ? `pt-0 md:pt-24 pb-[85px] md:pb-8` : ''}`}>
           {renderStep()}
      </main>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}>
            <div className="w-72 h-full bg-white shadow-2xl p-6 flex flex-col gap-8 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                    <div className="font-bold text-xl text-blue-700 tracking-tighter">LEADER PAK</div>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    {/* Navigation classique */}
                    {["Accueil", "Vision", "Héros", "Catalogue", "Devis", "Confiance", "Contact"].map((label, i) => (
                      <button key={i} onClick={() => goToStep(i)} className={`px-4 py-3 rounded-xl transition-all font-medium text-left ${currentStep === i ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}>
                        {label}
                      </button>
                    ))}
                    <div className="my-4 border-t border-slate-100"></div>
                    {/* Liens Admin/Dashboard */}
                    <button onClick={() => goToStep(TourStep.DASHBOARD)} className={`px-4 py-3 rounded-xl transition-all font-medium text-left ${currentStep === TourStep.DASHBOARD ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}>
                       <i className="fas fa-chart-line mr-2"></i> Dashboard Acheteur
                    </button>
                    <button onClick={() => goToStep(TourStep.ADMIN_LOGIN)} className={`px-4 py-3 rounded-xl transition-all font-medium text-left ${currentStep === TourStep.ADMIN_LOGIN || currentStep === TourStep.ADMIN_STATS ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}>
                       <i className="fas fa-lock mr-2"></i> Admin Stats
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
