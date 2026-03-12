import React, { useState } from 'react';
import {
  Briefcase, TrendingUp, PieChart, ArrowUpRight, DollarSign,
  Download, Settings, BarChart2, Building2, Zap, Leaf, Globe2,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { Chip, LinearProgress } from '@mui/material';
import { portfolioHoldings, portfolioGrowthData } from '../data/mockData';

const totalInvested = portfolioHoldings.reduce((acc, h) => acc + h.amount, 0);
const totalCurrent = portfolioHoldings.reduce((acc, h) => acc + h.currentValue, 0);
const totalGain = totalCurrent - totalInvested;
const gainPct = ((totalGain / totalInvested) * 100).toFixed(1);

const sectorPie = [
  { name: 'Infrastructure', value: 42, color: '#3b82f6' },
  { name: 'Renewable', value: 28, color: '#10b981' },
  { name: 'AgriTech', value: 15, color: '#84cc16' },
  { name: 'Smart Cities', value: 15, color: '#06b6d4' },
];

const statusStyle = {
  Active: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
  Maturing: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', dot: 'bg-blue-400 animate-pulse' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-bold text-emerald-400">₹{(payload[0].value / 100000).toFixed(1)}L</p>
      </div>
    );
  }
  return null;
};

export default function Portfolio() {
  const [activeHolding, setActiveHolding] = useState(null);

  return (
    <div className="min-h-screen bg-[#030712] pt-24 px-6 lg:px-8 pb-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-1">My Portfolio</p>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-purple-500/10 rounded-xl">
                <Briefcase className="w-5 h-5 text-purple-400" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Investment Portfolio</h1>
            </div>
            <p className="text-slate-400 text-sm">Track and manage your national growth investments.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 text-slate-300 rounded-xl transition-colors text-sm font-medium">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 text-slate-300 rounded-xl transition-colors text-sm font-medium">
              <Settings className="w-4 h-4" /> Settings
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div className="sm:col-span-2 bg-gradient-to-br from-emerald-500/10 to-blue-500/5 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <DollarSign className="w-28 h-28" />
            </div>
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Portfolio Value</p>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">₹{(totalCurrent / 100000).toFixed(1)}L</h2>
            <p className="text-sm text-emerald-400 mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> +₹{(totalGain / 1000).toFixed(0)}K ({gainPct}%) unrealised
            </p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Blended Yield
            </p>
            <h2 className="text-3xl font-bold text-white tracking-tight">13.2%</h2>
            <p className="text-xs text-slate-500 mt-1">IRR across all positions</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-400" /> Diversification
            </p>
            <h2 className="text-3xl font-bold text-white tracking-tight">{portfolioHoldings.length}</h2>
            <p className="text-xs text-slate-500 mt-1">Active sectors held</p>
          </div>
        </div>

        {/* Growth Chart + Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Growth */}
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-semibold text-white">Portfolio Growth</h2>
              <span className="text-xs text-slate-500">Jul 2025 – Feb 2026</span>
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioGrowthData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2.5} fillOpacity={1} fill="url(#portfolioGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sector Pie */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-base font-semibold text-white mb-5">Sector Split</h2>
            <div className="flex justify-center mb-4">
              <RePieChart width={160} height={160}>
                <Pie data={sectorPie} cx={80} cy={80} innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
                  {sectorPie.map((entry, i) => <Cell key={i} fill={entry.color} stroke="transparent" />)}
                </Pie>
              </RePieChart>
            </div>
            <div className="space-y-2">
              {sectorPie.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-xs text-slate-300">{s.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-white">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-800/50 flex justify-between items-center">
            <h3 className="text-base font-semibold text-white">Active Positions</h3>
            <span className="text-xs text-slate-500">{portfolioHoldings.length} holdings</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-slate-900/70 text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4 border-b border-slate-800">Asset</th>
                  <th className="px-6 py-4 border-b border-slate-800">Sector</th>
                  <th className="px-6 py-4 border-b border-slate-800">Deployed</th>
                  <th className="px-6 py-4 border-b border-slate-800">Current Value</th>
                  <th className="px-6 py-4 border-b border-slate-800">Yield IRR</th>
                  <th className="px-6 py-4 border-b border-slate-800">Since</th>
                  <th className="px-6 py-4 border-b border-slate-800 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-300">
                {portfolioHoldings.map((item) => {
                  const gain = item.currentValue - item.amount;
                  const gainP = ((gain / item.amount) * 100).toFixed(1);
                  const ss = statusStyle[item.status];
                  return (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-200 text-sm">{item.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{item.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${item.color} bg-slate-800`}>
                          {item.sector}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-white">₹{(item.amount / 100000).toFixed(1)}L</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">₹{(item.currentValue / 100000).toFixed(2)}L</div>
                        <div className="text-[11px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                          <ArrowUpRight className="w-3 h-3" />+{gainP}%
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-emerald-400">{item.returnRate}</td>
                      <td className="px-6 py-4 text-slate-400 text-xs">{item.date}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${ss.bg} ${ss.text} ${ss.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${ss.dot}`} />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
