import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CircularProgress = ({ 
  value = 0, 
  label = "", 
  subtext = "", 
  color = "#2563eb" 
}) => {
  // Données pour Recharts : la partie active et la partie restante (grise)
  const data = [
    { name: 'Completed', value: value },
    { name: 'Remaining', value: 100 - value },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#121418] border border-gray-800 rounded-2xl w-full h-full min-h-[220px]">
      <div className="relative w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={38}  // Contrôle l'épaisseur de l'anneau
              outerRadius={48}
              startAngle={90}    // Commence en haut
              endAngle={-270}   // Tour complet
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} cornerRadius={10} />
              <Cell fill="#1a1d23" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Texte au centre du cercle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{value}%</span>
        </div>
      </div>

      {/* Libellés en dessous */}
      <div className="text-center mt-2">
        <h3 className="text-sm font-semibold text-white tracking-wide">
          {label}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {subtext}
        </p>
      </div>
    </div>
  );
};

export default CircularProgress;