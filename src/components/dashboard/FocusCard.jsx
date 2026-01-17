"use client";
import React, { useState, useEffect } from 'react';
import { Play, Clock, Zap, Square } from 'lucide-react';
import Button from '@/components/ui/Button';

const FocusCard = ({ title, project, estimatedTime }) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Logique du chronomètre
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Formater les secondes en MM:SS
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`transition-all duration-500 rounded-xl p-6 flex flex-col text-white relative overflow-hidden shadow-md 
      ${isTimerRunning ? 'bg-emerald-600 ring-2 ring-emerald-400 ring-offset-2 ring-offset-[#0d0f12]' : 'bg-[#2563eb]'}`}>
      
      <div className="absolute top-3 right-3 opacity-30">
        <Zap size={20} fill="currentColor" className={isTimerRunning ? "animate-pulse" : ""} />
      </div>

      <span className="bg-white/20 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-3 w-fit">
        {isTimerRunning ? 'Travail en cours' : 'À faire ensuite'}
      </span>

      <h3 className="text-lg font-bold mb-1 truncate">{title}</h3>
      <p className="text-blue-100 text-xs mb-3">Projet: {project}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs text-blue-50">
          <Clock size={14} />
          <span>Prévu: {estimatedTime}</span>
        </div>
        {isTimerRunning && (
          <span className="text-xl font-mono font-bold">{formatTime(seconds)}</span>
        )}
      </div>

      <Button 
        variant="secondary" 
        icon={isTimerRunning ? Square : Play} 
        size="sm"
        onClick={() => setIsTimerRunning(!isTimerRunning)}
        className={isTimerRunning ? "bg-white text-emerald-600 hover:bg-white/90" : ""}
      >
        {isTimerRunning ? "Arrêter" : "Démarrer"}
      </Button>
    </div>
  );
};

export default FocusCard;