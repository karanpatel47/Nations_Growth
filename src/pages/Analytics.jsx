import React, { useState } from 'react';
import {
  BarChart2, TrendingUp, Target, Award, Download, RefreshCw,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area, LineChart, Line, ReferenceLine,
} from 'recharts';
import { Tabs, Tab } from '@mui/material';
import { sectorReturnData, monthlyInvestmentData, gdpData, portfolioGrowthData } from '../data/mockData';

const analyticsKPIs = [
  { label: 'Platform Avg. Return', value: '14.8%', change: '+1.2%', positive: true, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Your IRR', value: '13.2%', change: '+0.8%', positive: true, icon: Award, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'vs Benchmark (FD)', value: '+5.2%', change: 'vs 8% FD rate', positive: true, icon: Target, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Capital Efficiency', value: '94.1%', change: 'Deployed/Allocated', positive: true, icon: BarChart2, color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

const projectionData = [
  { year: 'Year 1', conservative: 1080000, expected: 1132000, optimistic: 1180000 },
  { year: 'Year 2', conservative: 1166400, expected: 1280624, optimistic: 1392400 },
  { year: 'Year 3', conservative: 1259712, expected: 1449666, optimistic: 1643032 },
  { year: 'Year 4', conservative: 1360489, expected: 1641084, optimistic: 1938777 },
  { year: 'Year 5', conservative: 1469328, expected: 1857104, optimistic: 2287757 },
];

const tabStyles = {
  '& .MuiTabs-indicator': { backgroundColor: '#10b981' },
  '& .MuiTab-root': { color: '#64748b', textTransform: 'none', fontSize: '0.875rem', fontWeight: 500, minHeight: 40, padding: '8px 16px' },
  '& .MuiTab-root.Mui-selected': { color: '#10b981' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-xs font-semibold mb-0.5" style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' && p.value > 10000 ? `₹${(p.value / 100000).toFixed(2)}L` : `${p.value}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [tab, setTab] = useState(0);

  return (
    <div className="min-h-screen bg-[#030712] pt-24 px-6 lg:px-8 pb-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">Analytics</p>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-amber-500/10 rounded-xl">
                <BarChart2 className="w-5 h-5 text-amber-400" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Investment Analytics</h1>
            </div>
            <p className="text-slate-400 text-sm">Performance insights, return projections, and sector benchmarks.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 text-slate-300 rounded-xl transition-colors text-sm font-medium">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 text-slate-300 rounded-xl transition-colors text-sm font-medium">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {analyticsKPIs.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm hover:border-slate-700 transition-all">
                <div className={`w-10 h-10 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${k.color}`} />
                </div>
                <p className="text-xs text-slate-400 mb-1">{k.label}</p>
                <p className={`text-2xl font-bold ${k.color} tracking-tight`}>{k.value}</p>
                <p className="text-[11px] text-slate-500 mt-1">{k.change}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl backdrop-blur-sm overflow-hidden">
          <div className="border-b border-slate-800 px-4">
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={tabStyles}>
              <Tab label="Sector Returns" />
              <Tab label="Monthly Flow" />
              <Tab label="GDP Contribution" />
              <Tab label="Return Projection" />
            </Tabs>
          </div>

          <div className="p-6">
            {/* Sector Returns Bar Chart */}
            {tab === 0 && (
              <div>
                <h2 className="text-sm font-semibold text-white mb-1">Sector-wise IRR vs Benchmark</h2>
                <p className="text-xs text-slate-500 mb-5">8% baseline = typical fixed-deposit rate</p>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectorReturnData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="sector" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ color: '#94a3b8', fontSize: '11px' }} />
                      <ReferenceLine y={8} stroke="#ef4444" strokeDasharray="4 2" label={{ value: 'FD Rate 8%', fill: '#ef4444', fontSize: 10 }} />
                      <Bar dataKey="return" name="NGIP IRR" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="benchmark" name="Benchmark" fill="#1e293b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Monthly Investment Flow */}
            {tab === 1 && (
              <div>
                <h2 className="text-sm font-semibold text-white mb-1">Monthly Capital Deployed & Returns</h2>
                <p className="text-xs text-slate-500 mb-5">Platform-wide values in ₹ Crores</p>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyInvestmentData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ color: '#94a3b8', fontSize: '11px' }} />
                      <Bar dataKey="deployed" name="Capital Deployed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="returns" name="Returns Generated" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* GDP Contribution Line */}
            {tab === 2 && (
              <div>
                <h2 className="text-sm font-semibold text-white mb-1">NGIP Contribution to National GDP</h2>
                <p className="text-xs text-slate-500 mb-5">Annual contribution breakdown by development sector (%)</p>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={gdpData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="year" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ color: '#94a3b8', fontSize: '11px' }} />
                      <Line type="monotone" dataKey="gdp" name="Total GDP %" stroke="#f8fafc" strokeWidth={2.5} dot={{ r: 4, fill: '#f8fafc' }} />
                      <Line type="monotone" dataKey="infra" name="Infrastructure" stroke="#3b82f6" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="energy" name="Energy" stroke="#10b981" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="employment" name="Employment" stroke="#f59e0b" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Return Projection */}
            {tab === 3 && (
              <div>
                <h2 className="text-sm font-semibold text-white mb-1">5-Year Return Projection (₹10L base investment)</h2>
                <p className="text-xs text-slate-500 mb-5">Conservative, Expected and Optimistic scenarios</p>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectionData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="optGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="year" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ color: '#94a3b8', fontSize: '11px' }} />
                      <Area type="monotone" dataKey="optimistic" name="Optimistic" stroke="#10b981" strokeWidth={2} fill="url(#optGrad)" dot={false} />
                      <Area type="monotone" dataKey="expected" name="Expected" stroke="#3b82f6" strokeWidth={2.5} fill="url(#expGrad)" dot={{ r: 4, fill: '#3b82f6' }} />
                      <Area type="monotone" dataKey="conservative" name="Conservative" stroke="#64748b" strokeWidth={2} fill="transparent" dot={false} strokeDasharray="4 2" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Projection Cards */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { label: 'Conservative (8%)', end: '₹14.7L', color: 'text-slate-400', border: 'border-slate-700/50' },
                    { label: 'Expected (13.2%)', end: '₹18.6L', color: 'text-blue-400', border: 'border-blue-500/20' },
                    { label: 'Optimistic (18%)', end: '₹22.9L', color: 'text-emerald-400', border: 'border-emerald-500/20' },
                  ].map((p) => (
                    <div key={p.label} className={`bg-slate-800/50 border ${p.border} rounded-xl p-4 text-center`}>
                      <p className="text-xs text-slate-500 mb-1">{p.label}</p>
                      <p className={`text-xl font-bold ${p.color}`}>{p.end}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">5yr value on ₹10L</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
