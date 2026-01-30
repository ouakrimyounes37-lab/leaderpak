
import React, { useState } from 'react';

interface Props {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const AdminLogin: React.FC<Props> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Identifiants de démonstration
    if (email === 'admin@leaderpak.ma' && password === 'leaderpak2024') {
      onLoginSuccess();
    } else {
      setError('Identifiants incorrects. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[32px] p-8 md:p-12 shadow-2xl animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user-shield text-2xl"></i>
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Accès Administration</h2>
          <p className="text-slate-400 text-sm mt-2">Visualisez les performances en temps réel.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Email Professionnel</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-slate-100 font-bold transition-all"
              placeholder="admin@leaderpak.ma"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Mot de passe</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-slate-100 font-bold transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center mt-2">{error}</p>}

          <button 
            type="submit" 
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-slate-800 transition-all active:scale-95"
          >
            Se Connecter
          </button>
        </form>

        <button onClick={onBack} className="w-full mt-6 text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest transition-colors">
          <i className="fas fa-arrow-left mr-2"></i> Retour au site
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
