import React from 'react';
import { TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { LinearProgress } from '@mui/material';

/**
 * InvestmentCard – reusable NGIP project card
 * @param {object} project   { name, sector, yield, raised, target, unit, status, minInvest, duration, icon: Icon, color, bg }
 * @param {function} [onInvest]
 */
export default function InvestmentCard({ project, onInvest }) {
  const { name, sector, yield: yield_, raised, target, unit = '', status, minInvest, duration, icon: Icon, color, bg } = project;
  const progress = Math.round((raised / target) * 100);
  const isFunded = status === 'Fully Funded';

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm hover:border-slate-700 transition-all flex flex-col gap-4 group">
      {/* Header */}
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${bg}`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-emerald-400 transition-colors">{name}</h3>
          <span className="text-[11px] text-slate-500 uppercase tracking-wider">{sector}</span>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border shrink-0 ${
          isFunded ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        }`}>
          {status}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-[10px] text-slate-500 mb-0.5">Est. Yield</p>
          <p className={`text-sm font-bold ${color} flex items-center gap-0.5`}>{yield_} <TrendingUp className="w-3 h-3" /></p>
        </div>
        {minInvest && (
          <div>
            <p className="text-[10px] text-slate-500 mb-0.5">Min. Invest</p>
            <p className="text-sm font-semibold text-slate-200">{minInvest}</p>
          </div>
        )}
        {duration && (
          <div>
            <p className="text-[10px] text-slate-500 mb-0.5">Duration</p>
            <p className="text-sm font-semibold text-slate-200 flex items-center gap-0.5"><Clock className="w-3 h-3" />{duration}</p>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-medium">
          <span className="text-slate-400">₹{raised}{unit} <span className="text-slate-600">/ ₹{target}{unit}</span></span>
          <span className={color}>{progress}%</span>
        </div>
        <LinearProgress
          variant="determinate"
          value={Math.min(progress, 100)}
          sx={{
            height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.06)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
              background: isFunded ? '#475569' : 'linear-gradient(90deg, #3b82f6, #10b981)',
            },
          }}
        />
      </div>

      {/* CTA */}
      <button
        disabled={isFunded}
        onClick={onInvest}
        className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
          isFunded
            ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50'
            : 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/20'
        }`}
      >
        {isFunded ? 'Closed' : 'Invest Now'}
        {!isFunded && <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  );
}
