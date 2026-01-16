import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import Button from '@/components/ui/Button';

const Header = ({ title, subtitle }) => {
  // Fonction pour obtenir la date formatée (ex: 16 Jan, 2026)
  const getFormattedDate = () => {
    const date = new Date();
    
    // Options de formatage : jour, mois abrégé, année
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).replace('.', ''); // Enlève le point après l'abréviation du mois si présent
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          {title}
        </h1>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="secondary" icon={CalendarIcon} className="bg-[#121418] capitalize">
          {getFormattedDate()}
        </Button>
      </div>
    </header>
  );
};

export default Header;