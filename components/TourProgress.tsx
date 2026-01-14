
import React from 'react';
import { TourStep } from '../types';

interface Props {
  currentStep: TourStep;
  onStepClick: (step: TourStep) => void;
}

const TourProgress: React.FC<Props> = ({ currentStep, onStepClick }) => {
  const steps = [
    { step: TourStep.VALUE_PROP, icon: 'fa-star', label: 'Valeur' },
    { step: TourStep.HERO_PRODUCT, icon: 'fa-gem', label: 'Héros' },
    { step: TourStep.CATALOG, icon: 'fa-list', label: 'Catalogue' },
    { step: TourStep.TERMS, icon: 'fa-calculator', label: 'Tarifs' },
    { step: TourStep.CREDIBILITY, icon: 'fa-shield-halved', label: 'Confiance' },
    { step: TourStep.CONVERSION, icon: 'fa-handshake', label: 'Contact' }
  ];

  return (
    <div className="flex items-center gap-2 md:gap-4">
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
  );
};

export default TourProgress;
