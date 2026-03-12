import React from 'react';
import {
  Globe2, Users, Building2, Zap, TrendingUp, Activity,
  MapPin, ArrowUpRight, Leaf, Factory,
} from 'lucide-react';
import { LinearProgress } from '@mui/material';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, AreaChart, Area,
} from 'recharts';
import { economicIndicators, impactProjects, gdpData } from '../data/mockData';

const impactKPIs = [
  { label: 'GDP Contribution', value: '₹4.8T', sub: 'cumulative development value', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Jobs Created', value: '4.2M+', sub: 'direct & indirect employment', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Projects Completed', value: '847', sub: 'across all development sectors', icon: Building2, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Clean Energy Added', value: '18 GW', sub: 'renewable capacity installed', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

const radarData = [
  { subject: 'Infrastructure', score: 74, fullMark: 100 },
  { subject: 'Energy', score: 82, fullMark: 100 },
  { subject: 'Employment', score: 68, fullMark: 100 },
  { subject: 'Industrial', score: 76, fullMark: 100 },
  { subject: 'AgriTech', score: 58, fullMark: 100 },
  { subject: 'Urban', score: 65, fullMark: 100 },
];

const sectorIcons = { Infrastructure: Building2, 'Renewable Energy': Zap, Employment: Users, Industrial: Factory, AgriTech: Leaf };

export default function Impact() {
  return (
    <div className="min-h-screen bg-[#030712] pt-24 px-6 lg:px-8 pb-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">Development Impact</p>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-cyan-500/10 rounded-xl">
                <Globe2 className="w-5 h-5 text-cyan-400" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">National Impact Tracker</h1>
            </div>
            <p className="text-slate-400 text-sm">Real-time development progress powered by citizen investments.</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400">Last updated: Q4 2025</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {impactKPIs.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700 transition-all">
                <div className={`w-11 h-11 rounded-2xl ${k.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${k.color}`} />
                </div>
                <p className="text-slate-400 text-xs mb-1">{k.label}</p>
                <p className={`text-2xl font-extrabold ${k.color} tracking-tight`}>{k.value}</p>
                <p className="text-xs text-slate-500 mt-1">{k.sub}</p>
              </div>
            );
          })}
        </div>

        {/* GDP Contribution Chart + Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* GDP Area Chart */}
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">GDP Growth Contribution by Sector</h2>
                <p className="text-xs text-slate-500 mt-0.5">Annual GDP % contributed via NGIP-funded projects</p>
              </div>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gdpData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="infraGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="empGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="year" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ color: '#94a3b8', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="infra" name="Infrastructure" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#infraGrad)" dot={false} />
                  <Area type="monotone" dataKey="energy" name="Renewable Energy" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#energyGrad)" dot={false} />
                  <Area type="monotone" dataKey="employment" name="Employment" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#empGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sector Development Radar */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-base font-semibold text-white mb-1">Development Score</h2>
            <p className="text-xs text-slate-500 mb-4">Composite index per sector (0–100)</p>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 9 }} />
                <Radar name="Score" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Economic Indicators Progress */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">Economic Performance Indicators</h2>
              <p className="text-xs text-slate-500 mt-0.5">Measured against national development targets</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">FY 2025–26</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {economicIndicators.map((ind) => (
              <div key={ind.label} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-white">{ind.label}</span>
                    <span className="ml-2 text-xs text-slate-500">({ind.value} / {ind.target})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-400">{ind.trend}</span>
                    <span className="text-xs font-bold text-white">{ind.pct}%</span>
                  </div>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={ind.pct}
                  sx={{
                    height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.05)',
                    '& .MuiLinearProgress-bar': { borderRadius: 4, backgroundColor: ind.color },
                  }}
                />
                <p className="text-xs text-slate-500">Target: {ind.target}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Development Projects */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-800/50 flex justify-between items-center">
            <h3 className="text-base font-semibold text-white">Live Development Projects</h3>
            <span className="text-xs text-slate-500">{impactProjects.length} featured projects</span>
          </div>
          <div className="divide-y divide-slate-800/50">
            {impactProjects.map((proj, i) => {
              const Icon = sectorIcons[proj.sector] || Globe2;
              return (
                <div key={i} className="px-6 py-5 hover:bg-slate-800/20 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-semibold text-white">{proj.name}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{proj.sector}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{proj.region}</span>
                          <span>Investment: <span className="text-slate-300 font-medium">{proj.investment}</span></span>
                          <span>Jobs: <span className="text-blue-400 font-medium">{proj.jobs.toLocaleString()}</span></span>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <LinearProgress
                            variant="determinate"
                            value={proj.completion}
                            sx={{
                              flex: 1, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.05)',
                              '& .MuiLinearProgress-bar': { borderRadius: 3, background: 'linear-gradient(90deg, #3b82f6, #10b981)' },
                            }}
                          />
                          <span className="text-xs font-bold text-emerald-400 shrink-0">{proj.completion}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
