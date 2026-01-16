import React from 'react';
import { Play, Clock, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';

const FocusCard = ({ 
  title = "Finaliser le projet d'examen", 
  project = "les pages publiques", 
  estimatedTime = "3h 30m" 
}) => {
  return (
    <div className="bg-[#2563eb] rounded-xl p-6 flex flex-col text-white relative overflow-hidden shadow-md shadow-blue-900/20">
      
      {/* Icône décorative */}
      <div className="absolute top-3 right-3 opacity-30">
        <Zap size={20} fill="currentColor" />
      </div>

      {/* Badge statut */}
      <span className="bg-white/20 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-3 w-fit">
        En cours
      </span>

      {/* Contenu */}
      <h3 className="text-lg font-bold leading-tight mb-1">
        {title}
      </h3>

      <p className="text-blue-100 text-xs mb-3">
        Projet: {project}
      </p>

      {/* Temps */}
      <div className="flex items-center gap-2 text-xs text-blue-50 mb-4">
        <Clock size={14} />
        <span>Temps estimé: {estimatedTime}</span>
      </div>

      {/* Bouton */}
      <Button variant="secondary" icon={Play} size="sm">
        Démarrer
      </Button>
    </div>
  );
};

export default FocusCard;
