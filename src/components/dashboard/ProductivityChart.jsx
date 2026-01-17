"use client";
import React, { useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { getCurrentWeekDates, getShortDayName, isDateToday } from '@/lib/dateUtils';

const ProductivityChart = () => {
  const { projects } = useProjects();

  const chartData = useMemo(() => {
    // Récupérer les jours de la semaine (Lundi à Dimanche)
    const weekDays = getCurrentWeekDates();
    
    // Extraire toutes les tâches de tous les projets
    const allTasks = projects.flatMap(p => p.tasks || []);

    return weekDays.map(day => {
      // Définir le début et la fin du jour pour la comparaison
      const dayStart = new Date(day).setHours(0, 0, 0, 0);
      const dayEnd = new Date(day).setHours(23, 59, 59, 999);
      const dayName = getShortDayName(day).replace('.', '');

      // Compter les tâches complétées ce jour-là
      const completedThisDay = allTasks.filter(task => {
        if (!task.completed) return false;

        // LOGIQUE DE REPLI : 
        // On utilise completedAt si présent, sinon l'id (car c'est un timestamp dans le JSON)
        const taskTimestamp = task.completedAt || task.id;
        
        return taskTimestamp >= dayStart && taskTimestamp <= dayEnd;
      }).length;

      return {
        name: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        value: completedThisDay,
        isToday: isDateToday(day)
      };
    });
  }, [projects]);

  const totalThisWeek = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-[#121418] border border-gray-800 rounded-2xl p-6 w-full h-80 flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Tendance de productivité</h3>
          <p className="text-sm text-gray-500">Tâches accomplies cette semaine</p>
        </div>
        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md text-xs font-bold border border-emerald-400/20">
          <TrendingUp size={14} />
          +{totalThisWeek}
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={({ x, y, payload }) => (
                <text 
                  x={x} y={y + 15} 
                  fill={chartData[payload.index]?.isToday ? "#3b82f6" : "#6b7280"} 
                  fontSize={12} 
                  fontWeight={chartData[payload.index]?.isToday ? "bold" : "normal"}
                  textAnchor="middle"
                >
                  {payload.value}
                </text>
              )}
            />
            
            <YAxis hide={true} domain={[0, 'dataMax + 2']} />
            
            <Tooltip 
              cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
              contentStyle={{ backgroundColor: '#1a1d23', border: '1px solid #374151', borderRadius: '12px' }}
              itemStyle={{ color: '#3b82f6' }}
              labelStyle={{ color: '#9ca3af' }}
            />

            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={1500}
              dot={{ r: 4, fill: '#121418', stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductivityChart;