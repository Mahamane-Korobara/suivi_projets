import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MoreVertical } from 'lucide-react';

const Dropdown = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Sélectionner...", 
  label,
  variant = "select", // "select" pour le formulaire, "action" pour les 3 points
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fermer le menu si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`flex flex-col gap-2 w-full relative ${className}`} ref={dropdownRef}>
      {label && <label className="text-sm font-medium text-gray-400">{label}</label>}
      
      {/* Trigger du Dropdown */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between cursor-pointer transition-all duration-200
          ${variant === "select" 
            ? "bg-[#1a1d23] border border-gray-700 rounded-lg p-3 text-sm text-gray-200 hover:border-gray-500" 
            : "p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white w-fit"}
        `}
      >
        {variant === "select" ? (
          <>
            <span className={!selectedOption ? "text-gray-500" : "text-gray-200"}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        ) : (
          <MoreVertical size={20} />
        )}
      </div>

      {/* Liste des options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 top-full bg-[#1a1d23] border border-gray-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className={`
                  px-4 py-2.5 text-sm cursor-pointer transition-colors
                  ${value === option.value ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}
                  flex items-center gap-2
                `}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.icon && <option.icon size={16} />}
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;