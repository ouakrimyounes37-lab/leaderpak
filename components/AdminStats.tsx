
import React, { useState, useEffect } from 'react';
import { getAdminStats } from '../supabaseService.ts';

interface Props {
  onBack: () => void;
}

const AdminStats: React.FC<Props> = ({ onBack }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getAdminStats();
        setData(stats);
      } catch (error) {
        console.error("Erreur stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <i className="fas fa-spinner animate-spin text-4xl text-blue-600"></i>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Chargement des données...</p>
        </div>
      </div>
    );
  }

  const visitsCount = data?.visits?.length || 0;
  const requestsCount = (data?.priceRequests?.length || 0) + (data?.meetings?.length || 0) + (data?.samples?.length || 0);

  // Grouping devices
  const deviceStats = data?.visits?.reduce((acc: any, v: any) => {
    acc[v.device] = (acc[v.device] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-4 justify-center md:justify-start">
              <i className="fas fa-chart-pie text-blue-600"></i>
              Statistiques Globales
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Suivi des performances et de l'acquisition</p>
          </div>
          <button onClick={onBack} className="bg-white border border-slate-200 text-slate-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
            <i className="fas fa-sign-out-alt mr-2"></i> Déconnexion
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <i className="fas fa-eye"></i>
            </div>
            <div className="text-4xl font-black text-slate-900">{visitsCount}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Visites Totales</div>
          </div>
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <div className="text-4xl font-black text-slate-900">{data?.priceRequests?.length || 0}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Grilles Tarifaires</div>
          </div>
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <i className="fas fa-handshake"></i>
            </div>
            <div className="text-4xl font-black text-slate-900">{data?.meetings?.length || 0}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Rendez-vous</div>
          </div>
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4">
              <i className="fas fa-vial"></i>
            </div>
            <div className="text-4xl font-black text-slate-900">{data?.samples?.length || 0}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Échantillons</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Recent Visits Table */}
          <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-black uppercase tracking-tighter">Dernières Visites</h2>
              <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1 bg-slate-50 rounded-full">Temps Réel</div>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                  <tr>
                    <th className="px-8 py-4">Source</th>
                    <th className="px-8 py-4">Appareil</th>
                    <th className="px-8 py-4">IP</th>
                    <th className="px-8 py-4">Navigateur</th>
                    <th className="px-8 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data?.visits?.slice(-10).reverse().map((v: any, i: number) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors text-sm">
                      <td className="px-8 py-4 font-bold text-slate-700">{v.source}</td>
                      <td className="px-8 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${v.device === 'Mobile' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                          {v.device}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-slate-400 font-mono text-xs">{v.ip}</td>
                      <td className="px-8 py-4 text-slate-600 font-medium">{v.browser}</td>
                      <td className="px-8 py-4 text-right text-slate-400 font-bold">{new Date(v.created_at).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Device Distribution */}
          <div className="lg:col-span-1 bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 flex flex-col">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-8 text-center md:text-left">Distribution Appareils</h2>
            <div className="flex-1 flex flex-col justify-center gap-6">
              {Object.entries(deviceStats || {}).map(([dev, count]: any) => {
                const perc = Math.round((count / visitsCount) * 100);
                return (
                  <div key={dev} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-black uppercase text-slate-900 tracking-widest">{dev}</span>
                      <span className="text-xl font-black text-blue-600">{perc}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-1000" 
                        style={{ width: `${perc}%` }}
                      ></div>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 text-right">{count} sessions</div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-50">
              <div className="bg-slate-900 rounded-3xl p-6 text-white text-center">
                <div className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Taux de Conversion Global</div>
                <div className="text-4xl font-black">{( (requestsCount / visitsCount) * 100).toFixed(1)}%</div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-10 border-t border-slate-200 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
          LeaderPak Industrial Intelligence — Privacy First
        </div>

      </div>
    </div>
  );
};

export default AdminStats;
