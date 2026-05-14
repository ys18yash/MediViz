import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { progressionData } from '../../data/mockPatient';

export function ProgressionChart() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer>
        <AreaChart data={progressionData} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="severityFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              border: '1px solid rgba(191,219,254,0.9)',
              borderRadius: 16,
              boxShadow: '0 16px 40px rgba(15,23,42,0.10)',
            }}
          />
          <Area
            type="monotone"
            dataKey="severity"
            name="Report score"
            stroke="#2563eb"
            fill="url(#severityFill)"
            strokeWidth={3}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="predicted"
            name="Predicted score"
            stroke="#14b8a6"
            strokeDasharray="6 6"
            strokeWidth={3}
            dot={{ r: 4, fill: '#14b8a6' }}
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
