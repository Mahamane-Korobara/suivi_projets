import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp } from 'lucide-react';

// Données fictives basées sur ton visuel (Lun à Dim)
const data = [
  { name: 'Lun', value: 30 },
  { name: 'Mar', value: 55 },
  { name: 'Mer', value: 40 },
  { name: 'Jeu', value: 60 },
  { name: 'Ven', value: 35 },
  { name: 'Sam', value: 70 },
  { name: 'Dim', value: 45 },
];

const ProductivityChart = () => {
  return (
    <div className="bg-[#121418] border border-gray-800 rounded-2xl p-6 w-full">
      {/* Header du graphique */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Tendance de productivité</h3>
          <p className="text-sm text-gray-500">Analyse des 7 derniers jours</p>
        </div>
        <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md text-xs font-bold">
          <TrendingUp size={14} />
          +12%
        </div>
      </div>

      {/* Graphique */}
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {/* Dégradé bleu sous la courbe */}
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              dy={10}
            />
            
            <YAxis hide={true} domain={[0, 100]} />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1d23', border: '1px solid #374151', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />

            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#2563eb" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductivityChart;