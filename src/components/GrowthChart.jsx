import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const defaultData = [
  { label: '2019', value: 5.5 },
  { label: '2020', value: 4.8 },
  { label: '2021', value: 6.2 },
  { label: '2022', value: 7.4 },
  { label: '2023', value: 8.0 },
  { label: '2024', value: 8.2 },
];

/**
 * GrowthChart – reusable NGIP area chart
 * @param {Array} [data]           Array of { label, value }
 * @param {string} [color]         Stroke hex color
 * @param {string} [gradientId]    Unique gradient ID
 * @param {string} [yUnit]         Y-axis unit suffix
 * @param {number} [height]
 */
export default function GrowthChart({
  data = defaultData,
  color = '#10b981',
  gradientId = 'growthGrad',
  yUnit = '%',
  height = 220,
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.25} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis dataKey="label" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}${yUnit}`} />
        <Tooltip
          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
          itemStyle={{ color }}
        />
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} fillOpacity={1} fill={`url(#${gradientId})`} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
