import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * StatsCard – NGIP platform KPI card
 * @param {string} title
 * @param {string} value
 * @param {string} [change]   e.g. "+12.5%"
 * @param {boolean} [positive]
 * @param {React.ElementType} [icon]
 * @param {string} [iconColor]  tailwind color class e.g. "text-emerald-400"
 * @param {string} [iconBg]     tailwind bg class e.g. "bg-emerald-500/10"
 */
export default function StatsCard({ title, value, change, positive = true, icon: Icon, iconColor = 'text-emerald-400', iconBg = 'bg-emerald-500/10' }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700 transition-all">
      <div className="flex justify-between items-start mb-4">
        {Icon && (
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        )}
        {change && (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
            {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </span>
        )}
      </div>
      <p className="text-slate-400 text-xs font-medium mb-1">{title}</p>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
    </div>
  );
}
