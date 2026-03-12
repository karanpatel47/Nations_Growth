// ─── NGIP Mock Data ────────────────────────────────────────────────────────

export const platformStats = [
  { label: 'Capital Deployed', value: '₹2.4T', sub: 'across all sectors' },
  { label: 'Projects Funded', value: '1,247', sub: 'active & completed' },
  { label: 'Avg. Annual Return', value: '14.8%', sub: 'growth-linked IRR' },
  { label: 'Citizens Investing', value: '2.8M+', sub: 'retail participants' },
];

export const sectors = [
  { id: 1, name: 'Infrastructure', icon: 'Building2', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', projects: 428, yieldRange: '11–14%', description: 'Roads, railways, bridges, ports and national connectivity networks.' },
  { id: 2, name: 'Renewable Energy', icon: 'Zap', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', projects: 312, yieldRange: '13–17%', description: 'Solar, wind, hydro and green energy generation projects.' },
  { id: 3, name: 'Employment Programs', icon: 'Users', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', projects: 189, yieldRange: '9–12%', description: 'Skill development centres, job creation and vocational training initiatives.' },
  { id: 4, name: 'Industrial Development', icon: 'Factory', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', projects: 156, yieldRange: '12–16%', description: 'Manufacturing zones, SEZs, tech parks and industrial corridors.' },
  { id: 5, name: 'AgriTech', icon: 'Leaf', color: 'text-lime-400', bg: 'bg-lime-500/10', border: 'border-lime-500/20', projects: 94, yieldRange: '10–15%', description: 'Digital value chains, precision farming and agri-infrastructure.' },
  { id: 6, name: 'Smart Cities', icon: 'Globe2', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', projects: 68, yieldRange: '10–13%', description: 'Smart utilities, IoT infrastructure, waste management and urban transit.' },
];

export const investmentProjects = [
  { id: 'NGF-101', name: 'National Green Highway Phase IV', sector: 'Infrastructure', yield: '12.4%', raised: 4500, target: 5000, unit: 'M', status: 'Funding', minInvest: '₹5,000', duration: '7 yrs', icon: 'Building2', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 'NGF-102', name: 'Solar Grid Expansion – Southern Region', sector: 'Renewable Energy', yield: '14.2%', raised: 1200, target: 2000, unit: 'M', status: 'Funding', minInvest: '₹1,000', duration: '5 yrs', icon: 'Zap', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 'NGF-103', name: 'Smart City Waste Management Hub', sector: 'Smart Cities', yield: '10.8%', raised: 800, target: 800, unit: 'M', status: 'Fully Funded', minInvest: '₹2,500', duration: '6 yrs', icon: 'Globe2', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { id: 'NGF-104', name: 'Agri-Tech Digital Value Chains', sector: 'AgriTech', yield: '15.5%', raised: 350, target: 600, unit: 'M', status: 'Funding', minInvest: '₹500', duration: '4 yrs', icon: 'Leaf', color: 'text-lime-400', bg: 'bg-lime-500/10' },
  { id: 'NGF-105', name: 'National Skill Mission – Phase II', sector: 'Employment Programs', yield: '11.2%', raised: 2100, target: 3000, unit: 'M', status: 'Funding', minInvest: '₹1,000', duration: '5 yrs', icon: 'Users', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { id: 'NGF-106', name: 'Eastern Industrial Corridor SEZ', sector: 'Industrial Development', yield: '13.7%', raised: 6800, target: 8000, unit: 'M', status: 'Funding', minInvest: '₹10,000', duration: '10 yrs', icon: 'Factory', color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

export const portfolioHoldings = [
  { id: 'INV-7489', name: 'National Green Highway Phase IV', sector: 'Infrastructure', amount: 2000000, returnRate: '12.4%', currentValue: 2248000, status: 'Active', date: 'Oct 24, 2025', color: 'text-blue-400' },
  { id: 'INV-3921', name: 'Solar Grid Expansion – Southern Region', sector: 'Renewable Energy', amount: 1500000, returnRate: '14.2%', currentValue: 1713000, status: 'Active', date: 'Nov 12, 2025', color: 'text-emerald-400' },
  { id: 'INV-1092', name: 'Smart City Waste Management Hub', sector: 'Smart Cities', amount: 800000, returnRate: '10.8%', currentValue: 886400, status: 'Maturing', date: 'Jan 05, 2026', color: 'text-cyan-400' },
  { id: 'INV-4410', name: 'Agri-Tech Digital Value Chains', sector: 'AgriTech', amount: 350000, returnRate: '15.5%', currentValue: 404250, status: 'Active', date: 'Feb 18, 2026', color: 'text-lime-400' },
];

export const portfolioGrowthData = [
  { month: 'Jul', value: 3800000 },
  { month: 'Aug', value: 4050000 },
  { month: 'Sep', value: 3920000 },
  { month: 'Oct', value: 4380000 },
  { month: 'Nov', value: 4750000 },
  { month: 'Dec', value: 4620000 },
  { month: 'Jan', value: 5100000 },
  { month: 'Feb', value: 5251650 },
];

export const economicIndicators = [
  { label: 'GDP Growth Contribution', value: '8.2%', target: '8.5%', pct: 96, trend: '+0.4%', color: '#10b981' },
  { label: 'Employment Generated', value: '4.2M jobs', target: '5M jobs', pct: 84, trend: '+220K', color: '#3b82f6' },
  { label: 'Infrastructure Score', value: '74/100', target: '80/100', pct: 74, trend: '+6 pts', color: '#a855f7' },
  { label: 'Export Growth Index', value: '12.4%', target: '15%', pct: 82, trend: '+1.8%', color: '#f59e0b' },
  { label: 'Renewable Energy Share', value: '38%', target: '50%', pct: 76, trend: '+4%', color: '#84cc16' },
  { label: 'Industrial Output Index', value: '110.6', target: '125', pct: 88, trend: '+8.2', color: '#06b6d4' },
];

export const gdpData = [
  { year: '2019', gdp: 5.5, infra: 3.2, energy: 1.1, employment: 1.2 },
  { year: '2020', gdp: 4.8, infra: 2.9, energy: 1.4, employment: 0.5 },
  { year: '2021', gdp: 6.2, infra: 3.8, energy: 1.8, employment: 0.6 },
  { year: '2022', gdp: 7.4, infra: 4.1, energy: 2.3, employment: 1.0 },
  { year: '2023', gdp: 8.0, infra: 4.6, energy: 2.8, employment: 0.6 },
  { year: '2024', gdp: 8.2, infra: 4.9, energy: 3.1, employment: 0.2 },
];

export const sectorReturnData = [
  { sector: 'Infrastructure', return: 12.4, benchmark: 8.0 },
  { sector: 'Renewable Energy', return: 14.2, benchmark: 8.0 },
  { sector: 'Employment', return: 11.2, benchmark: 8.0 },
  { sector: 'Industrial', return: 13.7, benchmark: 8.0 },
  { sector: 'AgriTech', return: 15.5, benchmark: 8.0 },
  { sector: 'Smart Cities', return: 10.8, benchmark: 8.0 },
];

export const monthlyInvestmentData = [
  { month: 'Jan', deployed: 18500, returns: 2100 },
  { month: 'Feb', deployed: 22000, returns: 2450 },
  { month: 'Mar', deployed: 19800, returns: 2900 },
  { month: 'Apr', deployed: 25400, returns: 3100 },
  { month: 'May', deployed: 28900, returns: 3800 },
  { month: 'Jun', deployed: 31200, returns: 4200 },
  { month: 'Jul', deployed: 29400, returns: 4500 },
  { month: 'Aug', deployed: 35700, returns: 5100 },
];

export const impactProjects = [
  { name: 'NH-48 Greenway Expansion', sector: 'Infrastructure', completion: 78, jobs: 12400, investment: '₹4.5B', region: 'South India' },
  { name: 'Rajasthan Solar Park III', sector: 'Renewable Energy', completion: 62, jobs: 8200, investment: '₹2.1B', region: 'Rajasthan' },
  { name: 'Skill India Digital Hubs', sector: 'Employment', completion: 91, jobs: 45000, investment: '₹3.0B', region: 'Pan-India' },
  { name: 'DMIC Industrial Nodes', sector: 'Industrial', completion: 55, jobs: 31000, investment: '₹8.0B', region: 'West India' },
  { name: 'Punjab AgriTech Corridor', sector: 'AgriTech', completion: 83, jobs: 6800, investment: '₹600M', region: 'Punjab' },
];
