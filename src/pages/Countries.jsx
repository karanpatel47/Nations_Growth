import React, { useState } from 'react';
import { unCountriesProgress } from '../data/mockData';
import { Globe, Search, BarChart3, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react';

export default function Countries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(unCountriesProgress[0]);

  const filteredCountries = unCountriesProgress.filter(c => 
    c.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-28 pb-16 min-h-screen bg-[#0a0f18] text-white selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Globe className="w-48 h-48 text-emerald-400" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
                <Globe className="w-4 h-4" /> Global Index
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Progress Tracker</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl">
                Explore UN-recognized countries and monitor their sector-wise development metrics, investment growth, and infrastructure milestones.
              </p>
            </div>
            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-right">
                <div className="text-3xl font-bold text-white">193</div>
                <div className="text-sm text-slate-400 font-medium">Nations Indexed</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-400">6</div>
                <div className="text-sm text-slate-400 font-medium">Key Sectors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search nations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all font-medium"
              />
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden h-[600px] flex flex-col">
              <div className="p-4 bg-slate-800/50 border-b border-slate-800/80 font-semibold text-slate-300">
                Nation Directory ({filteredCountries.length})
              </div>
              <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((nation) => (
                    <button
                      key={nation.id}
                      onClick={() => setSelectedCountry(nation)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all flex justify-between items-center group ${
                        selectedCountry?.id === nation.id
                          ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 border border-emerald-500/30'
                          : 'hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <span className={`font-medium ${selectedCountry?.id === nation.id ? 'text-emerald-400' : 'text-slate-300 group-hover:text-white'}`}>
                        {nation.country}
                      </span>
                      <ChevronRight className={`w-4 h-4 ${selectedCountry?.id === nation.id ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-500 flex flex-col items-center justify-center h-full">
                    <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                    <p>No nations found matching "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="w-full lg:w-2/3">
            {selectedCountry ? (
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl sticky top-28">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-800/80">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <Globe className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedCountry.country}</h2>
                    <div className="flex gap-4 text-sm font-medium">
                      <span className="text-slate-400">ID: {selectedCountry.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-400 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> Active Monitoring</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" /> Sector Progress Metrics
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(selectedCountry.progress).map(([sector, value]) => {
                    const progressValue = parseFloat(value);
                    let colorClass = 'from-red-500 to-orange-500';
                    let textClass = 'text-orange-500';
                    let bgClass = 'bg-orange-500/10 text-orange-400 border-orange-500/20';
                    let label = 'Needs Attention';

                    if (progressValue >= 75) {
                      colorClass = 'from-emerald-400 to-cyan-500';
                      textClass = 'text-emerald-400';
                      bgClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                      label = 'On Track';
                    } else if (progressValue >= 40) {
                      colorClass = 'from-blue-400 to-indigo-500';
                      textClass = 'text-blue-400';
                      bgClass = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
                      label = 'Progressing';
                    }

                    return (
                      <div key={sector} className="p-5 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold text-slate-200 group-hover:text-white transition-colors">{sector}</h4>
                          <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${bgClass}`}>
                            {label}
                          </span>
                        </div>
                        <div className="flex items-end justify-between mb-2">
                          <div className={`text-3xl font-bold ${textClass}`}>
                            {value}%
                          </div>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-2.5 rounded-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out`}
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
