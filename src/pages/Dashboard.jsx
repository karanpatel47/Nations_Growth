import React, { useState } from 'react';
import {
  Activity, DollarSign, Users, TrendingUp, ArrowUpRight, ArrowDownRight,
  MoreHorizontal, Zap, Building2, Factory, Leaf, Globe2, Download,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts';
import { LinearProgress, Chip, Tooltip as MuiTooltip } from '@mui/material';
import { portfolioGrowthData, economicIndicators, monthlyInvestmentData } from '../data/mockData';

const kpiCards = [
  { title: 'Total Portfolio Value', value: '₹52.5L', change: '+12.5%', positive: true, icon: DollarSign, color: 'text-emerald-400', glow: 'shadow-emerald-500/10' },
  { title: 'Active Projects', value: '4', change: '+1', positive: true, icon: Activity, color: 'text-blue-400', glow: 'shadow-blue-500/10' },
  { title: 'Avg. Annual Yield', value: '13.2%', change: '+0.8%', positive: true, icon: TrendingUp, color: 'text-purple-400', glow: 'shadow-purple-500/10' },
  { title: 'Co-Investors', value: '2.8M', change: '+124K', positive: true, icon: Users, color: 'text-amber-400', glow: 'shadow-amber-500/10' },
];

const recentActivity = [
  { action: 'Invested in Solar Grid Expansion', time: 'Today, 14:22', amount: '+₹1,50,000', type: 'invest', sector: 'Renewable Energy' },
  { action: 'Return credited – NH-48 Greenway', time: 'Yesterday, 09:00', amount: '+₹18,600', type: 'return', sector: 'Infrastructure' },
  { action: 'Invested in Skill India Digital Hubs', time: 'Dec 28, 11:30', amount: '+₹50,000', type: 'invest', sector: 'Employment' },
  { action: 'Portfolio rebalanced automatically', time: 'Dec 25, 08:00', amount: '', type: 'system', sector: '' },
];

const sectorAlloc = [
  { name: 'Infrastructure', pct: 42, color: '#3b82f6' },
  { name: 'Renewable Energy', pct: 28, color: '#10b981' },
  { name: 'AgriTech', pct: 15, color: '#84cc16' },
  { name: 'Smart Cities', pct: 15, color: '#06b6d4' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
            ₹{(p.value / 100000).toFixed(1)}L
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('growth');

  return (
    <div className="min-h-screen bg-[#030712] pt-24 px-6 lg:px-8 pb-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-1">Investor Dashboard</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, <span className="text-emerald-400">Investor</span></h1>
            <p className="text-slate-400 mt-1 text-sm">Your national growth portfolio — real-time overview.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-colors border border-slate-700 text-sm">
              <Download className="w-4 h-4" /> Report
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 text-sm">
              Deploy Capital
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpiCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className={`bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700 transition-all shadow-lg ${card.glow}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-slate-800/70">
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${card.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {card.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {card.change}
                  </span>
                </div>
                <p className="text-slate-400 text-xs font-medium mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-white tracking-tight">{card.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Portfolio Growth Chart */}
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">Portfolio Growth</h2>
                <p className="text-xs text-slate-500 mt-0.5">Growth-linked returns (INR)</p>
              </div>
              <div className="flex gap-2">
                {['growth', 'monthly'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === t ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
                  >
                    {t === 'growth' ? 'Portfolio' : 'Monthly'}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {activeTab === 'growth' ? (
                  <AreaChart data={portfolioGrowthData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradPortfolio" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#gradPortfolio)" dot={false} />
                  </AreaChart>
                ) : (
                  <BarChart data={monthlyInvestmentData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }} />
                    <Bar dataKey="deployed" name="Deployed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="returns" name="Returns" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ color: '#94a3b8', fontSize: '11px' }} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sector Allocation */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col">
            <h2 className="text-base font-semibold text-white mb-5">Sector Allocation</h2>
            <div className="space-y-4 flex-1">
              {sectorAlloc.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-slate-300 font-medium">{s.name}</span>
                    <span className="text-xs font-bold" style={{ color: s.color }}>{s.pct}%</span>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={s.pct}
                    sx={{
                      height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.06)',
                      '& .MuiLinearProgress-bar': { borderRadius: 3, backgroundColor: s.color },
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800">
              <p className="text-xs text-slate-500 mb-1">Total Deployed</p>
              <p className="text-2xl font-bold text-white">₹46.5L</p>
              <p className="text-xs text-emerald-400 mt-1">+₹5.8L unrealised gains</p>
            </div>
          </div>
        </div>

        {/* Economic Indicators + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Economic Indicators */}
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">Economic Indicators</h2>
                <p className="text-xs text-slate-500 mt-0.5">Return drivers — measured quarterly</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">Q4 2025</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {economicIndicators.map((ind) => (
                <div key={ind.label} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">{ind.label}</span>
                    <span className="text-xs font-medium text-emerald-400">{ind.trend}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <LinearProgress
                      variant="determinate"
                      value={ind.pct}
                      sx={{
                        flex: 1, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.06)',
                        '& .MuiLinearProgress-bar': { borderRadius: 3, backgroundColor: ind.color },
                      }}
                    />
                    <span className="text-xs font-bold text-white w-10 text-right shrink-0">{ind.pct}%</span>
                  </div>
                  <p className="text-xs text-slate-300">{ind.value} <span className="text-slate-600">/ {ind.target}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-semibold text-white">Recent Activity</h2>
              <button className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors">View All</button>
            </div>
            <div className="space-y-5">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    item.type === 'invest' ? 'bg-blue-500/10' : item.type === 'return' ? 'bg-emerald-500/10' : 'bg-slate-800'
                  }`}>
                    {item.type === 'invest' ? <DollarSign className="w-4 h-4 text-blue-400" /> :
                     item.type === 'return' ? <TrendingUp className="w-4 h-4 text-emerald-400" /> :
                     <Activity className="w-4 h-4 text-slate-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-200 leading-tight">{item.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-500">{item.time}</span>
                      {item.sector && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{item.sector}</span>
                      )}
                    </div>
                  </div>
                  {item.amount && (
                    <span className="text-xs font-semibold text-emerald-400 shrink-0">{item.amount}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
