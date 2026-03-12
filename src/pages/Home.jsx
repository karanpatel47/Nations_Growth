import React from 'react';
import { ArrowRight, Shield, TrendingUp, Globe2, Building2, Zap, Users, Factory, Leaf, CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { platformStats, sectors } from '../data/mockData';

const steps = [
  { step: '01', title: 'Register & Verify', desc: 'Create your investor account and complete KYC in minutes.' },
  { step: '02', title: 'Explore Sectors', desc: 'Browse development funds across infrastructure, energy, and more.' },
  { step: '03', title: 'Invest Capital', desc: 'Allocate funds into Nation Growth Funds starting from ₹500.' },
  { step: '04', title: 'Track Impact', desc: 'Monitor your contribution to real economic indicators live.' },
  { step: '05', title: 'Earn Returns', desc: 'Receive growth-linked returns tied to measurable national progress.' },
];

const iconMap = { Building2, Zap, Users, Factory, Leaf, Globe2 };

const benefits = [
  { icon: Shield, color: 'text-blue-400', bg: 'bg-blue-500/10', title: 'Government-Backed Security', desc: 'All Nation Growth Funds are backed by sovereign development allocations ensuring capital protection.' },
  { icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'Growth-Linked Returns', desc: 'Your returns are tied to measurable GDP, employment, and infrastructure metrics — not market speculation.' },
  { icon: Globe2, color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'Real National Impact', desc: 'Every rupee you invest is traceable to specific development projects improving citizen quality of life.' },
  { icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10', title: 'Inclusive Participation', desc: 'Start investing with as little as ₹500. Institutional-grade assets, accessible to every citizen.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] overflow-hidden pt-20">

      {/* ── Hero ── */}
      <section className="relative isolate px-6 pt-14 lg:px-8 pb-20">
        <div className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80" aria-hidden>
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-500 to-blue-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>

        <div className="mx-auto max-w-4xl py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm text-sm text-slate-300 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Now accepting citizen investors — Join 2.8M+ participants
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-6 leading-tight">
            Invest in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              National Growth.
            </span>
            <br />Earn Real Returns.
          </h1>
          <p className="text-lg leading-8 text-slate-400 font-light max-w-2xl mx-auto">
            The Nation Growth Investment Platform connects citizens directly to development funds —
            infrastructure, renewable energy, employment, and industrial progress — with growth-linked financial returns.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="group rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all flex items-center gap-2 active:scale-95"
            >
              Start Investing Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/investments"
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-2 px-6 py-4 rounded-xl hover:bg-white/5"
            >
              Explore Opportunities <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Platform Stats ── */}
      <section className="border-y border-slate-800/50 bg-slate-900/20 backdrop-blur-sm py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {platformStats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-extrabold text-white tracking-tight">{s.value}</div>
                <div className="text-sm font-semibold text-emerald-400 mt-1">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sectors ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-3">Investment Sectors</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Choose where your capital contributes to national development. Each sector offers measurable, growth-linked returns.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((s) => {
            const Icon = iconMap[s.icon] || Building2;
            return (
              <div
                key={s.id}
                className={`bg-slate-900/40 border ${s.border} rounded-3xl p-6 hover:-translate-y-1 transition-all duration-300 group cursor-pointer`}
              >
                <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <h3 className={`text-xl font-semibold text-white mb-1 group-hover:${s.color} transition-colors`}>{s.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{s.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{s.projects} projects</span>
                  <span className={`text-sm font-bold ${s.color}`}>{s.yieldRange} IRR</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link to="/investments" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
            View All Investment Opportunities <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-slate-900/30 border-y border-slate-800/50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-3">How NGIP Works</h2>
            <p className="text-slate-400 max-w-xl mx-auto">A simple five-step journey from citizen to national development investor.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 relative">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-emerald-500/20 border border-slate-700/50 flex items-center justify-center mx-auto mb-4 group-hover:border-emerald-500/30 transition-colors">
                  <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{s.step}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-[1px] bg-gradient-to-r from-slate-700 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-3">Why Choose NGIP?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Unlike stocks or mutual funds, NGIP ties your returns to real national economic progress.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex gap-5 hover:border-slate-700 transition-colors">
                <div className={`w-12 h-12 rounded-2xl ${b.bg} flex items-center justify-center shrink-0 mt-1`}>
                  <Icon className={`w-6 h-6 ${b.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{b.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900/40 to-emerald-900/20 border border-blue-500/20 p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-emerald-500/5 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Build the Nation?</h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-8">Join 2.8 million citizens already earning growth-linked returns while contributing to national development.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="group rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all flex items-center gap-2">
                Create Free Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/impact" className="text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-2 px-6 py-4 rounded-xl hover:bg-white/5 transition-colors">
                View National Impact <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
