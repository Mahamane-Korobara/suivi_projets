import React from 'react';
import { Calendar } from 'lucide-react';

const Input = ({ 
  label, 
  error, 
  icon: Icon, 
  isTextArea = false, 
  type = 'text', 
  className = '', 
  ...props 
}) => {
  
  // Styles de base pour le conteneur et le champ
  const containerStyles = "flex flex-col gap-2 w-full";
  
  const inputBaseStyles = `
    w-full bg-[#1a1d23] border rounded-lg p-3 text-sm text-gray-200 
    placeholder:text-gray-500 transition-all duration-200 outline-none
    ${error ? 'border-red-500' : 'border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}
  `;

  return (
    <div className={`${containerStyles} ${className}`}>
      {/* Label (Nom du projet, etc.) */}
      {label && (
        <label className="text-sm font-medium text-gray-400">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Icône personnalisée à gauche (si fournie) */}
        {Icon && !isTextArea && (
          <div className="absolute left-3 text-gray-500">
            <Icon size={18} />
          </div>
        )}

        {/* Rendu conditionnel : Textarea ou Input */}
        {isTextArea ? (
          <textarea
            className={`${inputBaseStyles} min-h-[100px] resize-none`}
            {...props}
          />
        ) : (
          <div className="w-full relative">
            <input
              type={type}
              className={`${inputBaseStyles} ${Icon ? 'pl-10' : ''} ${type === 'date' ? 'appearance-none' : ''}`}
              {...props}
            />
            
            {/* Icône Calendrier forcée pour le type date comme sur ta maquette */}
            {type === 'date' && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <Calendar size={18} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Message d'erreur */}
      {error && (
        <span className="text-xs text-red-500 mt-1">{error}</span>
      )}
    </div>
  );
};

export default Input;