
import React from 'react';
import { TourStep } from '../types';

interface Props {
  currentStep: TourStep;
  onStepClick: (step: TourStep) => void;
  showLabelOnly?: boolean;
  showIconsOnly?: boolean;
}

const TourProgress: React.FC<Props> = ({ currentStep, onStepClick, showLabelOnly, showIconsOnly }) => {
  const steps = [
    { step: TourStep.VALUE_PROP, icon: 'fa-star', label: 'Vision' },
    { step: TourStep.HERO_PRODUCT, icon: 'fa-gem', label: 'Héros' },
    { step: TourStep.CATALOG, icon: 'fa-list', label: 'Catalogue' },
    { step: TourStep.TERMS, icon: 'fa-calculator', label: 'Tarifs' },
    { step: TourStep.CREDIBILITY, icon: 'fa-shield-halved', label: 'Confiance' },
    { step: TourStep.CONVERSION, icon: 'fa-handshake', label: 'Contact' }
  ];

  const currentIndex = steps.findIndex(s => s.step === currentStep);

  return (
    <>
      {/* VERSION DESKTOP - Inchangée conformément aux instructions */}
      <div className="hidden md:flex items-center gap-2 md:gap-4">
        {steps.map((s, i) => {
          const isActive = currentStep === s.step;
          const isCompleted = currentStep > s.step;
          
          return (
            <React.Fragment key={s.step}>
              <button
                onClick={() => onStepClick(s.step)}
                className={`relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-100 scale-110' 
                    : isCompleted 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
                title={`Étape ${i + 1}`}
              >
                <i className={`fas ${isCompleted ? 'fa-check' : s.icon} text-[10px] md:text-xs`}></i>
                {isActive && (
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 hidden lg:block text-[10px] font-extrabold uppercase text-blue-600 whitespace-nowrap tracking-widest bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
                      {s.label}
                  </span>
                )}
              </button>
              {i < steps.length - 1 && (
                <div className={`h-0.5 w-3 md:w-8 rounded-full transition-colors duration-500 ${isCompleted ? 'bg-blue-200' : 'bg-slate-100'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* VERSION MOBILE - Style actif aligné sur desktop (sans glow), inactifs conservés */}
      <div className="flex md:hidden items-center justify-center gap-2.5">
        {steps.map((s) => {
          const isActive = currentStep === s.step;
          const isCompleted = currentStep > s.step;
          
          return (
            <div key={s.step} className="relative flex items-center justify-center">
              <button
                onClick={() => onStepClick(s.step)}
                className={`flex items-center justify-center transition-all duration-300 rounded-full ${
                  isActive 
                    ? 'w-9 h-9 bg-blue-600 text-white shadow-lg ring-4 ring-blue-100 scale-110 z-10' 
                    : isCompleted
                      ? 'w-6 h-6 bg-blue-50 text-blue-600 border border-blue-100/50'
                      : 'w-6 h-6 bg-slate-100/30 text-slate-500 border border-slate-100/50'
                }`}
              >
                <i className={`fas ${isCompleted ? 'fa-check' : s.icon} ${isActive ? 'text-[11px]' : 'text-[9px]'}`}></i>
              </button>
              
              {isActive && (
                <span className="absolute top-11 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-[0.2em] text-blue-700 whitespace-nowrap z-0 pointer-events-none">
                  {s.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TourProgress;
