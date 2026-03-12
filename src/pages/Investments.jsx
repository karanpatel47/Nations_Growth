import React, { useState } from 'react';
import {
  Search, Filter, TrendingUp, CheckCircle2, Building2, Zap,
  Users, Factory, Leaf, Globe2, Clock, ArrowRight, X,
} from 'lucide-react';
import {
  Chip, LinearProgress, TextField, InputAdornment, Select, MenuItem,
  FormControl, InputLabel, Dialog, DialogContent, DialogTitle, Button,
  Typography, Stack, IconButton,
} from '@mui/material';
import { investmentProjects } from '../data/mockData';

const iconMap = { Building2, Zap, Users, Factory, Leaf, Globe2 };
const allSectors = ['All', 'Infrastructure', 'Renewable Energy', 'Employment Programs', 'Industrial Development', 'AgriTech', 'Smart Cities'];

const statusColor = {
  'Funding': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'Fully Funded': { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-700/50' },
};

export default function Investments() {
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = investmentProjects.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sector.toLowerCase().includes(search.toLowerCase());
    const matchSector = sector === 'All' || p.sector === sector;
    return matchSearch && matchSector;
  });

  return (
    <div className="min-h-screen bg-[#030712] pt-24 px-6 lg:px-8 pb-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">Marketplace</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">Nation Growth Funds</h1>
            <p className="text-slate-400 mt-1 text-sm">Vetted development projects with growth-linked returns.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {investmentProjects.filter((p) => p.status === 'Funding').length} projects accepting capital
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <TextField
            placeholder="Search projects or sectors…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{
              flex: 1, maxWidth: 360,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(15,23,42,0.5)', borderRadius: '12px', color: 'white', fontSize: '0.875rem',
                '& fieldset': { borderColor: 'rgba(51,65,85,0.5)' },
                '&:hover fieldset': { borderColor: 'rgba(51,65,85,0.8)' },
                '&.Mui-focused fieldset': { borderColor: 'rgba(59,130,246,0.5)' },
              },
              '& .MuiInputBase-input::placeholder': { color: '#475569' },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} color="#64748b" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: 'rgba(15,23,42,0.5)', borderRadius: '12px', color: 'white', fontSize: '0.875rem',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(51,65,85,0.5)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(51,65,85,0.8)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(59,130,246,0.5)' },
                '& .MuiSvgIcon-root': { color: '#64748b' },
              }}
              MenuProps={{ PaperProps: { sx: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' } } }}
            >
              {allSectors.map((s) => (
                <MenuItem key={s} value={s} sx={{ color: 'white', fontSize: '0.875rem', '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' }, '&.Mui-selected': { backgroundColor: 'rgba(16,185,129,0.1)' } }}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Project Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">No projects match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((proj) => {
              const Icon = iconMap[proj.icon] || Building2;
              const progress = Math.round((proj.raised / proj.target) * 100);
              const sc = statusColor[proj.status];
              return (
                <div
                  key={proj.id}
                  className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm hover:border-slate-700 transition-all flex flex-col gap-4 group cursor-pointer"
                  onClick={() => setSelected(proj)}
                >
                  {/* Top */}
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${proj.bg}`}>
                      <Icon className={`w-5 h-5 ${proj.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-semibold text-white group-hover:${proj.color} transition-colors leading-snug`}>{proj.name}</h3>
                      <span className="text-[11px] text-slate-500 uppercase tracking-wider">{proj.sector}</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${sc.bg} ${sc.text} ${sc.border} shrink-0`}>
                      {proj.status}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-[10px] text-slate-500 mb-0.5">Est. Yield</p>
                      <p className={`text-base font-bold ${proj.color} flex items-center gap-0.5`}>
                        {proj.yield} <TrendingUp className="w-3 h-3" />
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 mb-0.5">Min. Invest</p>
                      <p className="text-sm font-semibold text-slate-200">{proj.minInvest}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 mb-0.5">Duration</p>
                      <p className="text-sm font-semibold text-slate-200 flex items-center gap-1"><Clock className="w-3 h-3" />{proj.duration}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-medium">
                      <span className="text-slate-400">₹{proj.raised}{proj.unit} <span className="text-slate-600">/ ₹{proj.target}{proj.unit}</span></span>
                      <span className={proj.color}>{progress}%</span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(progress, 100)}
                      sx={{
                        height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.06)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          background: proj.status === 'Fully Funded' ? '#475569' : 'linear-gradient(90deg, #3b82f6, #10b981)',
                        },
                      }}
                    />
                  </div>

                  {/* Action */}
                  <button
                    disabled={proj.status === 'Fully Funded'}
                    className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                      proj.status === 'Fully Funded'
                        ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50'
                        : 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/20'
                    }`}
                    onClick={(e) => { e.stopPropagation(); if (proj.status !== 'Fully Funded') setSelected(proj); }}
                  >
                    {proj.status === 'Fully Funded' ? 'Closed' : 'Invest Now'}
                    {proj.status !== 'Fully Funded' && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              backgroundColor: '#0f172a', border: '1px solid #1e293b',
              borderRadius: '24px', boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            },
          },
        }}
      >
        {selected && (() => {
          const Icon = iconMap[selected.icon] || Building2;
          const progress = Math.round((selected.raised / selected.target) * 100);
          return (
            <>
              <DialogTitle sx={{ p: 3, pb: 0 }}>
                <Stack direction="row" alignItems="flex-start" gap={2}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${selected.bg}`}>
                    <Icon className={`w-6 h-6 ${selected.color}`} />
                  </div>
                  <div className="flex-1">
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.3, fontSize: '1rem' }}>{selected.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{selected.sector} • {selected.id}</Typography>
                  </div>
                  <IconButton size="small" onClick={() => setSelected(null)} sx={{ color: '#64748b', '&:hover': { color: 'white' } }}>
                    <X size={18} />
                  </IconButton>
                </Stack>
              </DialogTitle>
              <DialogContent sx={{ p: 3 }}>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  {[
                    { label: 'Est. Yield (IRR)', value: selected.yield, color: selected.color },
                    { label: 'Duration', value: selected.duration, color: 'text-slate-200' },
                    { label: 'Min. Investment', value: selected.minInvest, color: 'text-slate-200' },
                    { label: 'Status', value: selected.status, color: selected.status === 'Funding' ? 'text-blue-400' : 'text-slate-400' },
                    { label: 'Target Size', value: `₹${selected.target}${selected.unit}`, color: 'text-slate-200' },
                    { label: 'Raised', value: `₹${selected.raised}${selected.unit}`, color: 'text-emerald-400' },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-800/50 rounded-xl p-3">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Funding Progress</span>
                    <span className={`font-semibold ${selected.color}`}>{progress}%</span>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(progress, 100)}
                    sx={{
                      height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.06)',
                      '& .MuiLinearProgress-bar': { borderRadius: 4, background: 'linear-gradient(90deg, #3b82f6, #10b981)' },
                    }}
                  />
                </div>
                <Button
                  fullWidth
                  disabled={selected.status === 'Fully Funded'}
                  sx={{
                    mt: 4, py: 1.75, borderRadius: '14px', fontWeight: 600, textTransform: 'none', fontSize: '0.95rem',
                    background: selected.status === 'Fully Funded' ? 'rgba(71,85,105,0.3)' : 'linear-gradient(90deg, #2563eb, #10b981)',
                    color: selected.status === 'Fully Funded' ? '#64748b' : 'white',
                    '&:hover': { opacity: 0.88 },
                    '&.Mui-disabled': { color: '#475569', background: 'rgba(71,85,105,0.3)' },
                  }}
                >
                  {selected.status === 'Fully Funded' ? 'This Fund is Closed' : `Invest in ${selected.name.split('–')[0].trim()}`}
                </Button>
              </DialogContent>
            </>
          );
        })()}
      </Dialog>
    </div>
  );
}
